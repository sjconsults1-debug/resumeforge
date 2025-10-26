# Admin Panel Guide

## 🔐 Admin Access Control

The user list is now protected and **only accessible to admin users**.

---

## 👥 Current Admin User

**Admin Account:**
- **Name**: sj soul
- **Email**: `ssd@gmail.com`
- **Role**: admin
- **Status**: Active ✅

---

## 🎯 How to Access the Admin Panel

### **Step 1: Login as Admin**
1. Go to: http://localhost:3000/pages/login.html
2. Login with admin credentials:
   - Email: `ssd@gmail.com`
   - Password: [Your password]

### **Step 2: Access Admin Panel**
1. After logging in, navigate to: **http://localhost:3000/pages/admin.html**
2. You'll see the admin dashboard with:
   - User statistics (Total, Active, Admin, Inactive users)
   - Complete user list with details
   - User management tools

---

## 🔒 Security Features

### **Role-Based Access Control (RBAC)**
- ✅ Only users with `admin` or `superadmin` role can access admin routes
- ✅ Regular users get "Access Denied" if they try to access admin panel
- ✅ All admin routes require JWT authentication token
- ✅ Middleware validates both authentication and admin role

### **Protected Admin Routes**

All admin routes are under `/api/admin/` and require admin privileges:

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/admin/users` | GET | List all users | Admin only |
| `/api/admin/stats` | GET | Get user statistics | Admin only |
| `/api/admin/users/:userId/role` | PUT | Update user role | Admin only |
| `/api/admin/users/:userId/status` | PUT | Activate/deactivate user | Admin only |

---

## 📊 Admin Panel Features

### **1. User Statistics Dashboard**
- Total Users count
- Active Users count
- Admin Users count
- Inactive Users count

### **2. User List Table**
View all users with:
- Full name and email
- Contact information (phone, location)
- Role (user, admin, superadmin)
- Account status (Active/Inactive)
- Registration date
- Last login date

### **3. User Management** (Coming Soon)
- Promote/demote users
- Activate/deactivate accounts
- View user activity
- Delete users

---

## 🛠️ Admin Management Scripts

### **Promote User to Admin**

**Command:**
```bash
node scripts/promote-admin.js <email>
```

**Example:**
```bash
node scripts/promote-admin.js test@example.com
```

**List all users (to see available emails):**
```bash
node scripts/promote-admin.js
```

### **List All Users**

**Command:**
```bash
node scripts/list-users.js
```

This will display:
- All registered users
- Their details (name, email, phone, location)
- Account status
- Role
- Registration and login dates

---

## 🔑 How to Create Another Admin

### **Option 1: Using the Script**
```bash
# Promote existing user to admin
node scripts/promote-admin.js user@example.com
```

### **Option 2: Direct Database Update**
1. Register a new user normally
2. Use the promote script to make them admin
3. They can now access the admin panel

---

## 🚫 Non-Admin Access

**What happens if a regular user tries to access admin routes?**

1. **Via API**: Gets `403 Forbidden` response
2. **Via Admin Panel**: Sees "Access Denied" message
3. **Authentication Required**: Must be logged in and have admin role

---

## 📋 Testing Admin Access

### **Test as Admin:**
1. Login with: `ssd@gmail.com`
2. Go to: http://localhost:3000/pages/admin.html
3. ✅ You should see the admin dashboard

### **Test as Regular User:**
1. Create a new account (or use non-admin account)
2. Try to access: http://localhost:3000/pages/admin.html
3. ❌ You should see "Access Denied" message

---

## 🔐 API Usage Examples

### **Get All Users (Admin Only)**
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3000/api/admin/users
```

### **Get Statistics (Admin Only)**
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3000/api/admin/stats
```

### **Update User Role (Admin Only)**
```bash
curl -X PUT \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"role": "admin"}' \
     http://localhost:3000/api/admin/users/USER_ID/role
```

---

## 🎯 Quick Access URLs

### **For Admins:**
- 🔐 **Login**: http://localhost:3000/pages/login.html
- 📊 **Admin Panel**: http://localhost:3000/pages/admin.html
- 👤 **Dashboard**: http://localhost:3000/pages/dashboard.html

### **For All Users:**
- 🏠 **Homepage**: http://localhost:3000
- 📝 **Register**: http://localhost:3000/pages/register.html
- 📄 **Resume Builder**: http://localhost:3000/pages/resume_builder.html

---

## 💡 Tips

1. **Always keep at least one admin user** - Don't demote all admins!
2. **Secure your admin accounts** - Use strong passwords
3. **Regular backups** - Keep your MongoDB data backed up
4. **Monitor user activity** - Check the admin panel regularly
5. **JWT tokens expire in 7 days** - Users need to re-login after that

---

## 🆘 Troubleshooting

### **"Access Denied" even though I'm admin**
- Make sure you're logged in
- Check your JWT token in localStorage
- Verify your role is set to 'admin' in database
- Try logging out and logging back in

### **Can't see admin panel**
- Check if server is running: `node server.js`
- Verify you're accessing: http://localhost:3000/pages/admin.html
- Check browser console for errors

### **Script errors**
- Ensure MongoDB is connected
- Check `.env` file has correct MONGODB_URI
- Verify email address is correct

---

## ✅ Summary

✅ **Admin panel created** at `/pages/admin.html`  
✅ **Admin routes protected** with authentication + role check  
✅ **Current admin**: ssd@gmail.com  
✅ **Scripts available** for user management  
✅ **Role-based access** fully implemented  

🎉 **Your admin system is now secure and functional!**
