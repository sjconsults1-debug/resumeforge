# ⚡ Quick Start Guide

Get ResumeForge up and running in 5 minutes!

## 🎯 Fastest Way to Start

### 1. Install Dependencies (1 minute)
```bash
npm install
```

### 2. Build CSS (30 seconds)
```bash
npm run build:css
```

### 3. Start Server (10 seconds)
```bash
node server.js
```

### 4. Open Browser
```
http://localhost:3000
```

**That's it!** 🎉

---

## 🚀 Quick Test Flow

### Test the Complete System (5 minutes)

1. **Register** → http://localhost:3000/pages/register.html
   - First Name: `Test`
   - Last Name: `User`
   - Email: `test@example.com`
   - Password: `test123`

2. **Login** → Automatic redirect to dashboard

3. **Create Resume** → Click "Create New Resume"
   - Fill in Step 1: Choose template
   - Fill in Step 2: Personal info
   - Fill in Step 3: Add experience
   - Fill in Step 4: Add skills
   - Fill in Step 5: Review

4. **Save Resume** → Click "Save Resume"

5. **Download PDF** → Back to dashboard, click "Download"

**Done!** You've tested the entire flow ✅

---

## 📦 What You Get

### Files Created
- ✅ 20+ new backend files
- ✅ 3 new frontend pages
- ✅ Complete authentication system
- ✅ PDF generation service
- ✅ Resume management API
- ✅ Comprehensive documentation

### Features Working
- ✅ User registration & login
- ✅ Create/edit/delete resumes
- ✅ PDF export
- ✅ Resume sharing
- ✅ Dashboard
- ✅ Profile management

---

## 🗂️ Important Files

```
📁 Key Directories:
├── controllers/     → Business logic
├── middleware/      → Auth & validation
├── models/          → Database models
├── routes/          → API endpoints
├── services/        → PDF generation
└── pages/           → Frontend UI

📄 Key Files:
├── server.js        → Main server
├── .env             → Configuration
├── README.md        → Full documentation
└── ROADMAP.md       → Future features
```

---

## 🔑 Key Commands

```bash
# Development
npm run dev          # Watch CSS changes
node server.js       # Start server

# Build
npm run build:css    # Compile CSS

# Testing
npx cypress open     # E2E tests
```

---

## 🌐 URLs to Remember

```
Main Site:     http://localhost:3000
Login:         http://localhost:3000/pages/login.html
Register:      http://localhost:3000/pages/register.html
Dashboard:     http://localhost:3000/pages/dashboard.html
Resume Builder: http://localhost:3000/pages/resume_builder.html
```

---

## 🔐 Default Test Credentials

After registering, use these for testing:
```
Email: test@example.com
Password: test123
```

---

## 📱 Test on Mobile

1. Find your local IP:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Update server to listen on all interfaces:
   ```javascript
   // In server.js, change:
   app.listen(port, '0.0.0.0', () => {
   ```

3. Access from phone:
   ```
   http://YOUR_IP:3000
   ```

---

## 🐛 Quick Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Use different port in .env
PORT=3001
```

### CSS not updating
```bash
npm run build:css
```

### MongoDB error (can ignore)
```
Server will run in fallback mode without database.
Features work but data won't persist between restarts.
```

### Can't login
```
Make sure you registered first!
Or check browser console for errors.
```

---

## 🎓 Learn More

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Complete documentation |
| [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) | API endpoints & testing |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Deploy to production |
| [ROADMAP.md](ROADMAP.md) | Future features |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | What was built |

---

## 🚀 Next Steps

### Option 1: Start Using It
- Register your account
- Create your real resume
- Download as PDF
- Share with friends

### Option 2: Customize It
- Add more templates (see ROADMAP.md)
- Change colors in `tailwind.config.js`
- Add features from Phase 2

### Option 3: Deploy It
- Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Choose hosting provider
- Share with the world!

### Option 4: Develop Further
- Read [ROADMAP.md](ROADMAP.md)
- Pick a feature to build
- Submit pull request

---

## 💬 Need Help?

1. **Check Documentation**
   - README.md has everything
   - API guide for endpoints
   - Deployment guide for hosting

2. **Check Browser Console**
   - F12 → Console tab
   - Look for error messages

3. **Check Server Logs**
   - Terminal where server is running
   - Look for error messages

4. **Check MongoDB**
   - Not required for basic functionality
   - App works in fallback mode

---

## ✅ Success Checklist

- [ ] Dependencies installed
- [ ] CSS compiled
- [ ] Server running
- [ ] Can access homepage
- [ ] Can register user
- [ ] Can login
- [ ] Can create resume
- [ ] Can download PDF
- [ ] Can see dashboard

**All checked?** You're ready to go! 🎉

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Setup
npm install
npm run build:css

# Run
node server.js
npm run dev  # (in separate terminal for CSS watch)

# Test
http://localhost:3000

# Deploy (choose one)
vercel           # Easiest
railway up       # Free database included
git push heroku main  # Classic
```

---

**⏱️ Time to First Resume: ~5 minutes**
**🎓 Learning Curve: Beginner-friendly**
**💪 Power: Production-ready**

**Happy Resume Building! 🚀**
