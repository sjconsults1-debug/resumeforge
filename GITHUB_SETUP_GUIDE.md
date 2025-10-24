# 📦 GitHub Repository Setup Guide

## Option 1: Quick Upload via GitHub Web (No Git Required) ⚡

### Step 1: Create Repository on GitHub
1. Go to **https://github.com** and login
2. Click the **"+"** icon (top right) → **"New repository"**
3. **Repository name**: `resumeforge` (or `resume-builder`)
4. **Description**: Professional Resume Builder - Built with HTML, Tailwind CSS, Node.js & Express
5. **Visibility**: Choose **Public** or **Private**
6. ❌ **DON'T** check "Add README" (we already have one)
7. Click **"Create repository"**

### Step 2: Upload Files
1. On the repository page, click **"uploading an existing file"**
2. **Drag and drop** your entire project folder OR click **"choose your files"**
3. **Important files to upload:**
   - All `.js` files (server.js, server-app.js, etc.)
   - All folders: `config/`, `controllers/`, `css/`, `js/`, `middleware/`, `models/`, `pages/`, `routes/`, `services/`
   - `package.json`, `package-lock.json`
   - `README.md`, `vercel.json`, `.env.example`
   - All documentation files (*.md)

4. **DON'T upload:**
   - `node_modules/` folder (too large)
   - `.env` file (contains secrets)
   - `data/` folder
   - `.vercel/` folder

5. Add commit message: `Initial commit - ResumeForge Resume Builder`
6. Click **"Commit changes"**

---

## Option 2: Install Git & Use Command Line (Recommended for Future) 🚀

### Step 1: Install Git
1. Download Git: **https://git-scm.com/download/win**
2. Run the installer
3. Use default settings (just click Next)
4. Restart your terminal/PowerShell

### Step 2: Configure Git
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Initialize Repository
```bash
cd "c:\Users\pc\Desktop\vs code\project resume"
git init
git add .
git commit -m "Initial commit - ResumeForge Resume Builder"
```

### Step 4: Create GitHub Repository
1. Go to **https://github.com** and login
2. Click **"+"** → **"New repository"**
3. Name: `resumeforge`
4. Click **"Create repository"**

### Step 5: Push to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/resumeforge.git
git branch -M main
git push -u origin main
```

---

## 📋 Files to Include in Repository

### ✅ Include These:
- `server.js`, `server-app.js`
- `package.json`, `package-lock.json`
- `vercel.json`, `.vercelignore`
- `.env.example` (NOT .env)
- `.gitignore`
- `README.md` and all documentation
- All source folders: `config/`, `controllers/`, `css/`, `js/`, `middleware/`, `models/`, `pages/`, `routes/`, `services/`
- `index.html`, `tailwind.config.js`, `cypress.config.js`

### ❌ DON'T Include:
- `node_modules/` (will be listed in .gitignore)
- `.env` (contains secrets!)
- `data/` folder
- `.vercel/` folder
- `*.log` files

---

## 🔐 Important: Protect Your Secrets

The `.env` file contains sensitive data. I've created `.env.example` for you to share publicly.

**Never commit `.env` to GitHub!**

Our `.gitignore` file already excludes it.

---

## 🎉 After Upload

Once uploaded, your repository will be at:
```
https://github.com/YOUR_USERNAME/resumeforge
```

You can then:
1. ✅ Share your code with others
2. ✅ Connect to Vercel for automatic deployments
3. ✅ Collaborate with team members
4. ✅ Track changes and versions
5. ✅ Deploy from GitHub to Vercel (automatic!)

---

## 🚀 Connect GitHub to Vercel (Automatic Deployments)

1. Go to **https://vercel.com**
2. Click **"Add New..."** → **"Project"**
3. **Import** your GitHub repository
4. Vercel auto-detects settings
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV`
6. Click **"Deploy"**

**Every git push will auto-deploy!** 🎉

---

## 📞 Need Help?

Choose your method:
- **Quick & Easy**: Use Option 1 (Web Upload)
- **Professional**: Install Git and use Option 2

Let me know which method you prefer!
