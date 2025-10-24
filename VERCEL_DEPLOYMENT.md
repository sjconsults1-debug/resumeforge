# 🚀 Vercel Deployment Guide

## Quick Deploy Steps

### Method 1: Deploy via Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```
- This will open your browser
- Sign up/login with GitHub, GitLab, or Bitbucket (recommended) or email

#### Step 3: Deploy
```bash
cd "c:\Users\pc\Desktop\vs code\project resume"
vercel
```

**Follow the prompts:**
- "Set up and deploy?" → **Yes**
- "Which scope?" → Select your account
- "Link to existing project?" → **No**
- "What's your project's name?" → **resumeforge** (or your choice)
- "In which directory is your code located?" → **./** (press Enter)

**Vercel will:**
1. Build your CSS
2. Upload your files
3. Deploy your app
4. Give you a live URL! 🎉

#### Step 4: Set Environment Variables
```bash
vercel env add MONGODB_URI
```
- Paste your MongoDB connection string (see MongoDB Atlas setup below)

```bash
vercel env add JWT_SECRET
```
- Enter a strong secret key (e.g., `resumeforge-production-secret-2024-xyz123`)

```bash
vercel env add NODE_ENV
```
- Enter: `production`

#### Step 5: Redeploy with Environment Variables
```bash
vercel --prod
```

---

### Method 2: Deploy via GitHub (One-Click)

#### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - ResumeForge"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/resumeforge.git
git branch -M main
git push -u origin main
```

#### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel auto-detects settings
5. Add environment variables (see below)
6. Click **"Deploy"**

---

## 🗄️ MongoDB Atlas Setup (Required)

Your app needs a cloud database. Here's how to set it up:

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a **Free Tier** cluster (M0)

### Step 2: Configure Database
1. **Database Access**:
   - Create database user
   - Username: `resumeforge`
   - Password: (generate strong password)
   - **Save this password!**

2. **Network Access**:
   - Click "Add IP Address"
   - Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - This is safe for serverless deployments

3. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://resumeforge:<password>@cluster0.xxxxx.mongodb.net/resumeforge?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

### Step 3: Test Locally First (Optional)
```bash
# Update your .env file
MONGODB_URI=mongodb+srv://resumeforge:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/resumeforge

# Test
node server.js
```

---

## 🔐 Environment Variables for Vercel

Add these in Vercel dashboard or CLI:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/resumeforge` |
| `JWT_SECRET` | Strong random string | `your-super-secret-jwt-key-production-2024` |
| `NODE_ENV` | `production` | `production` |

### Add via Vercel Dashboard:
1. Go to your project on vercel.com
2. **Settings** → **Environment Variables**
3. Add each variable
4. Redeploy

### Add via CLI:
```bash
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production
vercel env add NODE_ENV production
```

---

## 📝 Post-Deployment Checklist

After deployment:

- [ ] Test registration: https://your-app.vercel.app/pages/register.html
- [ ] Test login: https://your-app.vercel.app/pages/login.html
- [ ] Create a test resume
- [ ] Download PDF
- [ ] Check all pages load correctly
- [ ] Test on mobile device

---

## 🌐 Your Live URLs

After deployment, you'll get:

- **Production**: `https://resumeforge.vercel.app`
- **Dashboard**: `https://vercel.com/your-username/resumeforge`
- **Preview**: Every git push gets a preview URL

---

## 🔧 Troubleshooting

### Issue: "Module not found"
**Solution**: Make sure all dependencies are in `dependencies`, not `devDependencies`

### Issue: "MongoDB connection failed"
**Solution**: 
- Check connection string is correct
- Verify IP whitelist includes 0.0.0.0/0
- Ensure password has no special characters (or URL-encode them)

### Issue: "Build failed"
**Solution**: 
```bash
# Test build locally first
npm run build:css
```

### Issue: "Routes not working"
**Solution**: Check `vercel.json` is correctly configured (already done)

---

## 💰 Costs

- **Vercel Free Tier**: Perfect for this project
  - 100GB bandwidth/month
  - Unlimited projects
  - Automatic HTTPS
  - Custom domains

- **MongoDB Atlas Free Tier**: 
  - 512MB storage
  - Shared RAM
  - Perfect for getting started

**Total Cost: $0/month** ✅

---

## 🚀 Quick Deploy Commands (Summary)

```bash
# One-time setup
npm install -g vercel
vercel login

# Deploy
cd "c:\Users\pc\Desktop\vs code\project resume"
vercel

# Set environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET  
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

---

## 📱 Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add your domain (e.g., `myresume.com`)
4. Follow DNS configuration steps
5. Automatic HTTPS included!

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- ResumeForge Issues: Check your project files

**Ready to deploy? Run:** `vercel` 🚀
