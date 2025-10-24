# Registration Issue Fix Guide

## Problem Identified
The registration is failing because **MongoDB is not installed or running** on your system.

## Solutions (Choose ONE)

### Option 1: Install MongoDB Locally (Recommended for Development)

#### Step 1: Download MongoDB
1. Visit: https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Run the installer and follow the wizard

#### Step 2: Start MongoDB Service
```powershell
# Start MongoDB service
net start MongoDB
```

#### Step 3: Verify MongoDB is Running
```powershell
# Check if MongoDB is running
mongod --version
```

#### Step 4: Start Your Server
```powershell
node server.js
```

---

### Option 2: Use MongoDB Atlas (Cloud Database - FREE)

#### Step 1: Create Free MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a free cluster (M0 tier)

#### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

#### Step 3: Update .env File
Replace the MongoDB URI in your `.env` file:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/resumeforge?retryWrites=true&w=majority
```

#### Step 4: Whitelist Your IP
1. In Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for testing

#### Step 5: Start Your Server
```powershell
node server.js
```

---

### Option 3: Development Mode Without Database (Temporary Solution)

If you just want to test the frontend without database:

#### Modify server.js to handle missing database gracefully
The server already has fallback logic, but let's ensure it works properly.

#### Start Server (will run without DB)
```powershell
node server.js
```

**Note:** Registration will fail in this mode, but you can test the UI.

---

## Quick Test Steps

### 1. Ensure .env file exists
✅ Already created at: `c:\Users\pc\Desktop\vs code\project resume\.env`

### 2. Start the server
```powershell
cd "c:\Users\pc\Desktop\vs code\project resume"
node server.js
```

### 3. Open your browser
Navigate to: http://localhost:3000

### 4. Try Registration
- Click on "Create Account" or go to: http://localhost:3000/pages/register.html
- Fill in the form
- Submit

---

## Expected Behavior After Fix

### ✅ Success Response
- Status: 201 Created
- Message: "User registered successfully"
- Token is saved to localStorage
- Redirect to dashboard

### ❌ Error Responses
- "User already exists with this email" - Email already registered
- "Validation failed" - Form validation errors
- "Password must be at least 6 characters" - Password too short

---

## Troubleshooting

### Server won't start
```powershell
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process if needed
taskkill /PID <process_id> /F
```

### Database connection fails
```powershell
# Check MongoDB status (if installed locally)
net start MongoDB

# Or check if mongod process is running
tasklist | findstr mongod
```

### Registration still fails
1. Open browser console (F12)
2. Check Network tab
3. Look for errors in the console
4. Check server terminal for error messages

---

## Current Setup Summary

✅ Dependencies installed (bcryptjs, express-validator, jsonwebtoken, mongoose)
✅ .env file created
✅ Server routes configured
✅ Validation middleware ready
❌ MongoDB not installed/running (MAIN ISSUE)

---

## Recommended Next Steps

1. **For Quick Testing:** Use MongoDB Atlas (Option 2) - Takes 5-10 minutes
2. **For Full Development:** Install MongoDB locally (Option 1) - Takes 10-15 minutes

Choose the option that best fits your needs!
