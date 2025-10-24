require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resumes');
const publicRoutes = require('./routes/public');
const pdfController = require('./controllers/pdfController');
const { authenticateToken } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - serve from root
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Serve a tiny default favicon to avoid 404s
app.get('/favicon.ico', (req, res) => {
  const img = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=', 'base64');
  res.setHeader('Content-Type', 'image/png');
  res.send(img);
});

// Root route
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

// Connect to database
if (process.env.MONGODB_URI) {
  connectDB().catch(err => {
    console.warn('MongoDB connection failed, continuing without database:', err.message);
  });
}

module.exports = app;
