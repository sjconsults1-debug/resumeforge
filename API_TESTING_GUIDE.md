# 🧪 API Testing Guide

Quick reference for testing all API endpoints.

## Base URL
```
http://localhost:3000
```

## 1️⃣ Authentication Flow

### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "password": "test123",
  "phone": "(555) 123-4567",
  "location": "San Francisco, CA"
}
```

**Expected Response (201)**:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "john@test.com",
    "firstName": "John",
    "lastName": "Doe",
    ...
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@test.com",
  "password": "test123"
}
```

**Save the token from response!**

### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
```

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "firstName": "Jane",
  "phone": "(555) 999-8888",
  "linkedinUrl": "linkedin.com/in/janedoe"
}
```

## 2️⃣ Resume Management

### Create Resume
```http
POST /api/resumes
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Software Engineer Resume",
  "personalInfo": {
    "fullName": "John Doe",
    "jobTitle": "Senior Software Engineer",
    "email": "john@test.com",
    "phone": "(555) 123-4567",
    "location": "San Francisco, CA",
    "linkedin": "linkedin.com/in/johndoe",
    "summary": "Experienced software engineer with 5+ years in web development."
  },
  "experience": [
    {
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "startDate": "2020-01-15",
      "current": true,
      "description": "• Led team of 5 developers\n• Built scalable microservices\n• Improved performance by 40%"
    },
    {
      "title": "Software Engineer",
      "company": "StartupXYZ",
      "startDate": "2018-06-01",
      "endDate": "2019-12-31",
      "description": "• Developed React applications\n• Implemented CI/CD pipelines"
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science in Computer Science",
      "institution": "Stanford University",
      "startDate": "2014-09-01",
      "endDate": "2018-05-15",
      "gpa": "3.8"
    }
  ],
  "skills": [
    { "name": "JavaScript", "level": "Expert" },
    { "name": "React", "level": "Advanced" },
    { "name": "Node.js", "level": "Advanced" },
    { "name": "Python", "level": "Intermediate" }
  ],
  "projects": [
    {
      "name": "E-commerce Platform",
      "description": "Built a full-stack e-commerce application with 10k+ users",
      "technologies": "React, Node.js, MongoDB, AWS"
    }
  ],
  "certifications": [
    {
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "date": "2022-03-15"
    }
  ],
  "templateId": "modern",
  "colorScheme": "#1E40AF",
  "font": "Inter"
}
```

### List All Resumes
```http
GET /api/resumes
Authorization: Bearer YOUR_TOKEN_HERE
```

### Get Single Resume
```http
GET /api/resumes/:resumeId
Authorization: Bearer YOUR_TOKEN_HERE
```

### Update Resume
```http
PUT /api/resumes/:resumeId
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Updated Resume Title",
  "colorScheme": "#059669"
}
```

### Duplicate Resume
```http
POST /api/resumes/:resumeId/duplicate
Authorization: Bearer YOUR_TOKEN_HERE
```

### Delete Resume
```http
DELETE /api/resumes/:resumeId
Authorization: Bearer YOUR_TOKEN_HERE
```

## 3️⃣ Resume Sharing

### Generate Share Link
```http
POST /api/resumes/:resumeId/share
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response**:
```json
{
  "message": "Share link generated",
  "shareUrl": "http://localhost:3000/share/abc123def456",
  "shareId": "abc123def456"
}
```

### View Shared Resume (Public - No Auth)
```http
GET /api/share/:shareId
```

## 4️⃣ PDF Export

### Download PDF
```http
GET /api/resumes/:resumeId/download
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response**: PDF file download

### Preview PDF (Inline)
```http
GET /api/resumes/:resumeId/preview
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response**: PDF displayed in browser

## 🧪 Test Scenarios

### Scenario 1: Complete User Journey
1. Register new user
2. Login and get token
3. Create first resume
4. View resume list
5. Download PDF
6. Generate share link
7. Access shared resume (public)

### Scenario 2: Multiple Resumes
1. Login
2. Create "Software Engineer Resume"
3. Create "Data Scientist Resume"
4. List all resumes
5. Duplicate "Software Engineer Resume"
6. Update one resume
7. Delete one resume

### Scenario 3: Profile Management
1. Login
2. Get profile
3. Update profile info
4. Change password
5. Get profile again to verify

## 🔴 Error Testing

### Invalid Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "wrong@test.com",
  "password": "wrongpass"
}
```

**Expected**: 401 Unauthorized

### Access Without Token
```http
GET /api/resumes
```

**Expected**: 401 - Access token required

### Invalid Token
```http
GET /api/resumes
Authorization: Bearer invalid_token_here
```

**Expected**: 403 - Invalid or expired token

### Validation Errors
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "not-an-email",
  "password": "123"
}
```

**Expected**: 400 - Validation failed

## 📝 Notes

- All timestamps use ISO 8601 format
- Tokens expire in 7 days
- Resume IDs are MongoDB ObjectIDs
- Share IDs are 32-character hex strings
- PDF generation may take 1-3 seconds

## 🛠️ Tools for Testing

### Option 1: cURL (Command Line)
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@test.com","password":"test123"}'

# Login and save token
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"test123"}' | jq -r '.token')

# Use token for authenticated requests
curl http://localhost:3000/api/resumes \
  -H "Authorization: Bearer $TOKEN"
```

### Option 2: Postman
1. Download Postman
2. Import collection (create one with all endpoints)
3. Set environment variable for token
4. Test all endpoints

### Option 3: Thunder Client (VS Code)
1. Install Thunder Client extension
2. Create requests
3. Use {{token}} variable
4. Test all endpoints

### Option 4: Frontend UI
1. Open http://localhost:3000/pages/register.html
2. Register and login through UI
3. Use dashboard to manage resumes
4. Check browser DevTools Network tab

## ✅ Success Criteria

- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Token is returned and valid
- [ ] Can create resume
- [ ] Can list all resumes
- [ ] Can update resume
- [ ] Can delete resume
- [ ] Can duplicate resume
- [ ] Can download PDF
- [ ] Can generate share link
- [ ] Can access shared resume without auth
- [ ] Error handling works correctly

---

**Happy Testing! 🚀**
