require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/database');
const Resume = require('./models/Resume');

// Import routes
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resumes');
const publicRoutes = require('./routes/public');
const pdfController = require('./controllers/pdfController');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

const fs = require('fs');
const fsp = fs.promises;
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'resumes.json');

// Ensure data directory exists
async function ensureDataFile() {
  try {
    await fsp.mkdir(dataDir, { recursive: true });
    try {
      await fsp.access(dataFile);
    } catch (e) {
      // create empty array file
      await fsp.writeFile(dataFile, JSON.stringify([]), 'utf8');
    }
  } catch (err) {
    console.error('Failed to ensure data file:', err);
  }
}

// Read resumes from file-backed store (dev)
async function readResumesFromFile() {
  try {
    await ensureDataFile();
    const raw = await fsp.readFile(dataFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading resumes file:', err);
    return [];
  }
}

// Append resume to file-backed store and return saved record
async function appendResumeToFile(record) {
  try {
    const list = await readResumesFromFile();
    list.push(record);
    await fsp.writeFile(dataFile, JSON.stringify(list, null, 2), 'utf8');
    return record;
  } catch (err) {
    console.error('Error writing resumes file:', err);
    throw err;
  }
}

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname)));

// Serve a tiny default favicon to avoid 404s in dev/static serving
app.get('/favicon.ico', (req, res) => {
  // 1x1 transparent PNG
  const img = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=', 'base64');
  res.setHeader('Content-Type', 'image/png');
  res.send(img);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve HTML pages
app.get('/pages/homepage.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'homepage.html'));
});

app.get('/pages/resume_builder.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'resume_builder.html'));
});

app.get('/pages/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

app.get('/pages/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});

app.get('/pages/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'dashboard.html'));
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/share', publicRoutes);

// PDF download routes
app.get('/api/resumes/:id/download', authenticateToken, pdfController.downloadPDF);
app.get('/api/resumes/:id/preview', authenticateToken, pdfController.previewPDF);

// Start server only after successful DB connection
async function startServer() {
  try {
    if (process.env.MONGODB_URI) {
      // attempt DB connection when URI provided
      await connectDB();
    } else {
      console.warn('MONGODB_URI not set — starting server without database connection (development mode).');
    }

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (err) {
    // If DB connection fails, log error but still start server to allow local/dev usage
    console.error('Database connection failed:', err);
    console.warn('Starting server without database connection (fallback).');
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  }
}

startServer();

// API endpoint to save resume data
app.post('/api/resume', async (req, res) => {
  const resumeData = req.body;

  try {
    // helper to normalize incoming date-like values into Date or null
    const normalizeDate = (v) => {
      if (!v && v !== 0) return undefined;
      // if already a Date
      if (v instanceof Date) return isNaN(v.getTime()) ? undefined : v;
      // try ISO parse
      const d = new Date(v);
      if (!isNaN(d.getTime())) return d;
      // fallback: keep original string if parsing fails (so schema can accept strings)
      return v;
    };

    const payload = {
      userId: resumeData.userId || null,
      title: resumeData.title || 'Untitled Resume',
      sections: {
        personalInfo: resumeData.personalInfo || {},
        education: (resumeData.education || []).map(e => ({
          ...e,
          startDate: normalizeDate(e && e.startDate),
          endDate: normalizeDate(e && e.endDate)
        })),
        experience: (resumeData.experience || []).map(ex => ({
          ...ex,
          startDate: normalizeDate(ex && ex.startDate),
          endDate: normalizeDate(ex && ex.endDate)
        })),
        skills: resumeData.skills || [],
        projects: resumeData.projects || [],
        certifications: resumeData.certifications || [],
        customSections: resumeData.customSections || []
      },
      templateId: resumeData.templateId || 'modern',
      colorScheme: resumeData.colorScheme || '#1E40AF',
      font: resumeData.font || 'Inter',
      isPublic: resumeData.isPublic || false,
      shareId: resumeData.shareId || undefined,
      lastModified: new Date()
    };

    // If Mongoose model is available and DB is connected, prefer database persistence
    if (process.env.MONGODB_URI && Resume && typeof Resume.create === 'function') {
      const savedResume = await Resume.create(payload);
      return res.status(201).json({ message: 'Resume saved successfully', resume: savedResume });
    }

    // Fallback: file-backed store in data/resumes.json when DB not available (development mode)
    try {
      const inMemoryStore = app.locals._inMemoryResumes || [];
      // create a record id
      const id = (Date.now() + Math.floor(Math.random() * 1000)).toString();
      const record = Object.assign({ _id: id }, payload);

      // try file-backed append; if it fails, fallback to in-memory
      try {
        await appendResumeToFile(record);
        // also keep in-memory cache
        app.locals._inMemoryResumes = (app.locals._inMemoryResumes || []).concat(record);
        return res.status(201).json({ message: 'Resume saved (file-backed)', resume: record });
      } catch (fileErr) {
        // file write failed, fallback to in-memory
        const inId = (inMemoryStore.length + 1).toString();
        const inRecord = Object.assign({ _id: inId }, payload);
        inMemoryStore.push(inRecord);
        app.locals._inMemoryResumes = inMemoryStore;
        return res.status(201).json({ message: 'Resume saved (in-memory fallback)', resume: inRecord });
      }
    } catch (err) {
      console.error('Unexpected error in fallback persistence:', err);
      return res.status(500).json({ message: 'Failed to persist resume in development store' });
    }
  } catch (error) {
    console.error('Error saving resume:', error);
    // Mongoose cast error - bad IDs or bad date formats that couldn't be cast
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid input format', error: error.message });
    }

    // Duplicate key error (e.g., unique index on shareId)
    if (error.code === 11000) {
      // find the key that caused duplication
      const key = Object.keys(error.keyValue || {}).join(', ') || 'field';
      return res.status(409).json({ message: `Duplicate value for unique field(s): ${key}`, error: error.keyValue });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET resumes - list saved resumes (supports DB or in-memory fallback)
app.get('/api/resume', async (req, res) => {
  try {
    if (process.env.MONGODB_URI && Resume && typeof Resume.find === 'function') {
      const list = await Resume.find({}).limit(100).lean();
      return res.json({ resumes: list });
    }

    const inMemoryStore = app.locals._inMemoryResumes || [];
    return res.json({ resumes: inMemoryStore });
  } catch (err) {
    console.error('Error fetching resumes:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

