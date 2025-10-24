# 🚀 ResumeForge - Complete Quick Reference Guide

## 🌐 LIVE WEBSITE LINKS

### **Primary Production URL (Latest Deployment):**
```
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app
```

### **Alternative Production URL:**
```
https://resumeforge-9qkw0wujz-alphaqueen768-1548s-projects.vercel.app
```

### **Vercel Dashboard:**
```
https://vercel.com/alphaqueen768-1548s-projects/resumeforge
```

---

## 🔗 KEY PAGE LINKS

### **Homepage:**
```
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app/
```

### **Login Page (Enhanced with Storage Info):**
```
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app/pages/login.html
```

### **Resume Builder (8 Templates + PDF Download):**
```
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app/pages/resume_builder.html
```

### **Register Page:**
```
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app/pages/register.html
```

### **Dashboard:**
```
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app/pages/dashboard.html
```

### **Storage Visualization (Interactive Diagram):**
```
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app/docs/storage-visualization.html
```

---

## 🏠 DOMAIN NAME

### **Current Deployment:**
- **Subdomain:** `resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app`
- **Project Name:** `resumeforge`
- **Account:** `alphaqueen768-1548s-projects`
- **Platform:** Vercel

### **To Add Custom Domain (Optional):**
1. Go to: https://vercel.com/alphaqueen768-1548s-projects/resumeforge/settings/domains
2. Click "Add Domain"
3. Enter your custom domain (e.g., `www.myresumeforge.com`)
4. Follow DNS configuration instructions

---

## 📁 LOGIN FILE STORAGE LOCATIONS

### **1. LOCAL FILE PATHS:**

#### **Login Page (Frontend):**
```
c:\Users\pc\Desktop\vs code\project resume\pages\login.html
```

#### **Auth Routes (API Endpoints):**
```
c:\Users\pc\Desktop\vs code\project resume\routes\auth.js
```

#### **Auth Controller (Business Logic):**
```
c:\Users\pc\Desktop\vs code\project resume\controllers\authController.js
```

#### **User Model (Database Schema):**
```
c:\Users\pc\Desktop\vs code\project resume\models\User.js
```

#### **Database Configuration:**
```
c:\Users\pc\Desktop\vs code\project resume\config\database.js
```

#### **Environment Variables:**
```
c:\Users\pc\Desktop\vs code\project resume\.env
```

#### **Documentation Files:**
```
c:\Users\pc\Desktop\vs code\project resume\docs\LOGIN_DATA_FLOW.md
c:\Users\pc\Desktop\vs code\project resume\docs\LOGIN_SUMMARY.md
c:\Users\pc\Desktop\vs code\project resume\docs\storage-visualization.html
```

---

### **2. DATA STORAGE LOCATIONS:**

#### **MongoDB Database (Permanent Storage):**
- **Connection String:** `mongodb://localhost:27017/resumeforge`
- **Database Name:** `resumeforge`
- **Collection:** `users`
- **What's Stored:**
  - Email (unique, indexed)
  - Password (bcrypt hashed)
  - First & Last Name
  - Phone, Location, LinkedIn
  - Role, Active Status
  - Last Login Timestamp
  - Resume IDs (array)
  - User Preferences
  - Created/Updated Dates

#### **Browser localStorage (Session Storage):**
- **Location:** Client-side browser storage
- **What's Stored:**
  - `token` → JWT authentication token (7-day expiration)
  - `user` → User profile info (JSON string)
- **Access:** Press F12 → Application → Local Storage

---

## 💻 ALL COMMANDS USED (IN ORDER)

### **1. Project Setup & Installation:**
```bash
cd "c:\Users\pc\Desktop\vs code\project resume"
npm install
```

### **2. Build CSS (Before Deployment):**
```bash
npm run build:css
```
**Purpose:** Compiles Tailwind CSS from `css/tailwind.css` to `css/main.css`

### **3. Start Local Development Server:**
```bash
node server.js
```
**Access at:** http://localhost:3000

### **4. Start Development with CSS Watch:**
```bash
npm run dev
```
**Purpose:** Auto-compiles CSS on file changes

### **5. Deploy to Vercel (Production):**
```bash
vercel --prod --yes
```
**Alternative (interactive):**
```bash
vercel
```

### **6. Login to Vercel (First Time):**
```bash
vercel login
```

### **7. Install Vercel CLI (If not installed):**
```bash
npm install -g vercel
```

---

## 🔄 COMPLETE UPDATE WORKFLOW

### **To Update the Website (Step-by-Step):**

1. **Make changes to your code** (HTML, CSS, JS files)

2. **Build the CSS:**
   ```bash
   cd "c:\Users\pc\Desktop\vs code\project resume"
   npm run build:css
   ```

3. **Test locally (Optional but recommended):**
   ```bash
   node server.js
   ```
   Then visit: http://localhost:3000

4. **Deploy to production:**
   ```bash
   vercel --prod --yes
   ```

5. **Wait for deployment** (~15-20 seconds)

6. **Visit your live site** at the URL provided

---

## 🗄️ DATABASE COMMANDS

### **View MongoDB Data:**
```bash
# Start MongoDB shell
mongosh

# Select database
use resumeforge

# View all users
db.users.find().pretty()

# Find specific user
db.users.findOne({ email: "user@example.com" })

# Count total users
db.users.countDocuments()

# View only emails (hide passwords)
db.users.find({}, { email: 1, firstName: 1, lastName: 1 })
```

---

## 🔍 DEBUGGING COMMANDS

### **View localStorage Data (Browser Console - F12):**
```javascript
// View token
console.log(localStorage.getItem('token'));

// View user data
console.log(localStorage.getItem('user'));

// Parse user JSON
console.log(JSON.parse(localStorage.getItem('user')));

// View all localStorage
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));
}
```

### **Decode JWT Token (Browser Console):**
```javascript
const token = localStorage.getItem('token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);
```

### **Clear localStorage (Logout):**
```javascript
localStorage.clear();
// or
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

## 📊 API ENDPOINTS

### **Base URL (Local):**
```
http://localhost:3000/api
```

### **Base URL (Production):**
```
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app/api
```

### **Authentication Endpoints:**

#### **Register:**
- **URL:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "location": "New York, USA"
  }
  ```

#### **Login:**
- **URL:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123456",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    }
  }
  ```

#### **Get Profile (Protected):**
- **URL:** `GET /api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`

#### **Update Profile (Protected):**
- **URL:** `PUT /api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`

---

## 🛠️ TROUBLESHOOTING COMMANDS

### **If CSS not updating:**
```bash
npm run build:css
vercel --prod --yes
```

### **If deployment fails:**
```bash
# Check Vercel status
vercel ls

# View deployment logs
vercel logs <deployment-url>

# Redeploy
vercel --prod --yes --force
```

### **If MongoDB not connecting:**
```bash
# Start MongoDB (Windows)
net start MongoDB

# Check MongoDB status
mongosh --eval "db.runCommand({ ping: 1 })"
```

### **If port 3000 already in use:**
```bash
# Find process using port 3000 (Windows)
netstat -ano | findstr :3000

# Kill process by PID
taskkill /PID <PID> /F
```

---

## 📝 ENVIRONMENT VARIABLES (.env file)

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/resumeforge
JWT_SECRET=resumeforge-super-secret-jwt-key-change-in-production-2024
```

**⚠️ Important:** Never commit `.env` file to Git! It's in `.gitignore`.

---

## 📦 PROJECT STRUCTURE

```
project resume/
├── pages/
│   ├── login.html              ← Enhanced login page
│   ├── register.html
│   ├── dashboard.html
│   ├── resume_builder.html     ← 8 templates + PDF download
│   └── homepage.html
├── js/
│   └── resume_builder.js       ← Client-side logic
├── css/
│   ├── tailwind.css           ← Source CSS
│   ├── main.css               ← Compiled CSS (build output)
│   └── overrides.css
├── routes/
│   └── auth.js                ← API routes
├── controllers/
│   └── authController.js      ← Login/Register logic
├── models/
│   ├── User.js                ← User schema
│   └── Resume.js
├── config/
│   └── database.js            ← MongoDB connection
├── middleware/
│   ├── auth.js                ← JWT verification
│   └── validation.js
├── docs/
│   ├── LOGIN_DATA_FLOW.md     ← Complete documentation
│   ├── LOGIN_SUMMARY.md       ← Quick summary
│   └── storage-visualization.html  ← Interactive diagram
├── .env                       ← Environment variables
├── server.js                  ← Express server
├── vercel.json               ← Vercel config
└── package.json              ← Dependencies
```

---

## 🎯 QUICK START CHECKLIST

### **For Local Development:**
- [ ] Install dependencies: `npm install`
- [ ] Create `.env` file with MongoDB URI and JWT secret
- [ ] Start MongoDB: `net start MongoDB`
- [ ] Build CSS: `npm run build:css`
- [ ] Start server: `node server.js`
- [ ] Open browser: http://localhost:3000

### **For Deployment:**
- [ ] Make code changes
- [ ] Build CSS: `npm run build:css`
- [ ] Deploy: `vercel --prod --yes`
- [ ] Wait for deployment to complete
- [ ] Test live URL

---

## 📚 DOCUMENTATION FILES

1. **QUICK_REFERENCE.md** (This file)
   - All links, commands, and locations

2. **docs/LOGIN_DATA_FLOW.md**
   - Technical documentation (368 lines)
   - Complete data flow diagrams
   - Security measures

3. **docs/LOGIN_SUMMARY.md**
   - Quick summary (146 lines)
   - Storage locations
   - Testing instructions

4. **docs/storage-visualization.html**
   - Interactive visual diagram
   - Storage details
   - Command references

---

## 🔑 KEY FEATURES

### **Current Website Features:**
✅ Enhanced Login Page with storage info  
✅ 8 Professional Resume Templates  
✅ Color Customization (Primary, Accent, Text)  
✅ Real PDF Download (html2pdf.js)  
✅ Mobile-Responsive Design  
✅ Form Validation  
✅ Password Show/Hide Toggle  
✅ MongoDB User Storage  
✅ JWT Authentication  
✅ Session Management (localStorage)  

---

## 📞 SUPPORT RESOURCES

### **Vercel Documentation:**
```
https://vercel.com/docs
```

### **MongoDB Documentation:**
```
https://www.mongodb.com/docs/
```

### **Tailwind CSS Documentation:**
```
https://tailwindcss.com/docs
```

---

## 🎨 CUSTOM DOMAIN SETUP (Optional)

### **Step 1: Buy Domain**
- GoDaddy, Namecheap, Google Domains, etc.

### **Step 2: Add to Vercel**
1. Go to: https://vercel.com/alphaqueen768-1548s-projects/resumeforge/settings/domains
2. Click "Add"
3. Enter domain name (e.g., `myresumeforge.com`)

### **Step 3: Configure DNS**
Add these records at your domain provider:

| Type  | Name | Value                          |
|-------|------|--------------------------------|
| A     | @    | 76.76.21.21                   |
| CNAME | www  | cname.vercel-dns.com          |

### **Step 4: Wait for Verification**
- Usually takes 24-48 hours
- Vercel auto-provisions SSL certificate

---

## 💡 REMEMBER THESE COMMANDS

### **Most Used Commands:**
```bash
# 1. Build CSS before deployment
npm run build:css

# 2. Deploy to production
vercel --prod --yes

# 3. Start local server
node server.js

# 4. View MongoDB data
mongosh
use resumeforge
db.users.find().pretty()
```

---

## 📱 CONTACT & ACCOUNT INFO

- **Vercel Account:** alphaqueen768-1548s-projects
- **Project Name:** resumeforge
- **Local Path:** `c:\Users\pc\Desktop\vs code\project resume`
- **MongoDB Database:** resumeforge
- **MongoDB Collection:** users

---

**Last Updated:** 2025-10-24  
**Latest Deployment:** https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app  
**Documentation:** All files in `/docs` folder

---

## 🎯 SUMMARY

**Main Live URL:**  
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app

**Login Page:**  
https://resumeforge-f1g7ngsr1-alphaqueen768-1548s-projects.vercel.app/pages/login.html

**Login Data Stored In:**
1. MongoDB: `mongodb://localhost:27017/resumeforge` (users collection)
2. Browser localStorage: JWT token + user info

**Update Command:**
```bash
npm run build:css && vercel --prod --yes
```

**This is your complete reference guide! Save this file for future use.** 📖
