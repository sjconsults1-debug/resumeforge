# 🚀 Deployment Guide

Complete guide to deploying ResumeForge to production.

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] MongoDB database ready (local or Atlas)
- [ ] Environment variables configured
- [ ] Security review completed
- [ ] Backup strategy planned
- [ ] Domain name acquired (optional)
- [ ] SSL certificate ready (automatic with most hosts)

## 🌐 Hosting Options

### Option 1: Vercel + MongoDB Atlas (Recommended for Quick Deploy)

**Best for**: Quick deployment, serverless, automatic HTTPS

#### Steps:

1. **Setup MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/resumeforge`
   - Whitelist all IPs: `0.0.0.0/0`

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login
   vercel login
   
   # Deploy
   vercel
   ```

3. **Set Environment Variables in Vercel**
   - Dashboard → Project → Settings → Environment Variables
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/resumeforge
   JWT_SECRET=super-secret-change-this-long-string
   NODE_ENV=production
   ```

4. **Configure vercel.json**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server.js"
       },
       {
         "src": "/(.*)",
         "dest": "/$1"
       }
     ]
   }
   ```

---

### Option 2: Railway (Full Stack - Easiest)

**Best for**: Full control, easy setup, built-in database

#### Steps:

1. **Go to** [Railway.app](https://railway.app)
2. **Sign up** with GitHub
3. **New Project** → Deploy from GitHub repo
4. **Add MongoDB** from Railway templates
5. **Set Environment Variables**:
   ```
   MONGODB_URI=${{MongoDB.MONGO_URL}}
   JWT_SECRET=your-secret-key
   PORT=${{PORT}}
   ```
6. **Deploy** - Railway auto-deploys on git push

**Cost**: ~$5/month

---

### Option 3: Render (Free Tier Available)

**Best for**: Free hosting with automatic HTTPS

#### Steps:

1. **Go to** [Render.com](https://render.com)
2. **New Web Service** → Connect GitHub repo
3. **Settings**:
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. **Add MongoDB Atlas connection**
5. **Set Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   ```

**Free Tier**: Spins down after inactivity (slower cold starts)

---

### Option 4: Heroku

**Best for**: Established platform, lots of add-ons

#### Steps:

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku login
   heroku create resumeforge-app
   ```

3. **Add MongoDB**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Open App**
   ```bash
   heroku open
   ```

---

### Option 5: DigitalOcean / AWS / GCP (VPS)

**Best for**: Full control, scalability, custom configs

#### Steps (DigitalOcean example):

1. **Create Droplet** ($5/month)
   - Ubuntu 22.04 LTS
   - 1GB RAM minimum

2. **SSH into server**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt-get install -y nodejs
   ```

4. **Install MongoDB**
   ```bash
   curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   apt-get update
   apt-get install -y mongodb-org
   systemctl start mongod
   systemctl enable mongod
   ```

5. **Clone and Setup App**
   ```bash
   cd /var/www
   git clone your-repo
   cd resumeforge
   npm install
   ```

6. **Create .env file**
   ```bash
   nano .env
   ```
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/resumeforge
   JWT_SECRET=super-secret-production-key
   NODE_ENV=production
   ```

7. **Install PM2** (Process Manager)
   ```bash
   npm install -g pm2
   pm2 start server.js --name resumeforge
   pm2 save
   pm2 startup
   ```

8. **Install Nginx** (Reverse Proxy)
   ```bash
   apt-get install -y nginx
   ```

9. **Configure Nginx**
   ```bash
   nano /etc/nginx/sites-available/resumeforge
   ```
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

10. **Enable Site**
    ```bash
    ln -s /etc/nginx/sites-available/resumeforge /etc/nginx/sites-enabled/
    nginx -t
    systemctl restart nginx
    ```

11. **Setup SSL with Let's Encrypt**
    ```bash
    apt-get install -y certbot python3-certbot-nginx
    certbot --nginx -d your-domain.com
    ```

---

## 🔒 Production Security Checklist

### Essential

- [ ] Strong `JWT_SECRET` (32+ characters, random)
- [ ] HTTPS enabled (SSL certificate)
- [ ] MongoDB authentication enabled
- [ ] Environment variables properly set
- [ ] CORS configured for production domain
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive info

### Recommended

- [ ] Implement rate limiting
  ```bash
  npm install express-rate-limit
  ```
  ```javascript
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/api/', limiter);
  ```

- [ ] Add helmet for security headers
  ```bash
  npm install helmet
  ```
  ```javascript
  const helmet = require('helmet');
  app.use(helmet());
  ```

- [ ] Setup logging
  ```bash
  npm install morgan winston
  ```

- [ ] Add monitoring (Sentry, LogRocket)
- [ ] Setup automated backups
- [ ] Implement CSRF protection
- [ ] Add security headers

---

## 🗄️ Database Setup

### MongoDB Atlas (Cloud)

1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IPs (use `0.0.0.0/0` for all IPs or specific IPs)
4. Get connection string
5. Replace in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumeforge?retryWrites=true&w=majority
   ```

### Local MongoDB

1. Install MongoDB Community Edition
2. Start service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```
3. Use connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/resumeforge
   ```

---

## 📊 Monitoring & Logging

### Option 1: PM2 Logs (VPS)
```bash
pm2 logs resumeforge
pm2 monit
```

### Option 2: Sentry (Error Tracking)
```bash
npm install @sentry/node
```

```javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'your-sentry-dsn' });
app.use(Sentry.Handlers.errorHandler());
```

### Option 3: LogRocket (Session Replay)
For frontend monitoring

---

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build CSS
      run: npm run build:css
    
    - name: Run tests
      run: npm test
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 💾 Backup Strategy

### MongoDB Backups

**Automated (MongoDB Atlas)**
- Automatic daily backups
- Point-in-time recovery
- Configure in Atlas dashboard

**Manual Backups**
```bash
# Export database
mongodump --uri="mongodb://localhost:27017/resumeforge" --out=/backup/$(date +%Y%m%d)

# Restore database
mongorestore --uri="mongodb://localhost:27017/resumeforge" /backup/20240101
```

### Code Backups
- Use Git for version control
- Push to GitHub/GitLab
- Tag releases: `git tag v1.0.0`

---

## 🎯 Performance Optimization

1. **Enable Compression**
   ```bash
   npm install compression
   ```
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add Caching**
   ```javascript
   app.use(express.static('public', { maxAge: '1d' }));
   ```

3. **Database Indexing** (Already done in models)

4. **CDN for Static Assets** (Cloudflare, AWS CloudFront)

5. **Image Optimization** (for future profile photos)

---

## 🧪 Pre-Production Testing

1. **Load Testing**
   ```bash
   npm install -g artillery
   artillery quick --count 10 --num 100 http://localhost:3000
   ```

2. **Security Audit**
   ```bash
   npm audit
   npm audit fix
   ```

3. **Lighthouse Audit**
   - Open Chrome DevTools
   - Run Lighthouse
   - Fix performance/accessibility issues

---

## 📱 Domain Setup

1. **Purchase domain** (Namecheap, GoDaddy, Google Domains)

2. **Configure DNS**:
   - A Record: `@` → Your server IP
   - CNAME: `www` → your-domain.com

3. **Wait for DNS propagation** (up to 48 hours)

4. **Configure in hosting platform**

---

## ✅ Post-Deployment Checklist

- [ ] App accessible via URL
- [ ] HTTPS working
- [ ] Database connected
- [ ] User registration working
- [ ] Login working
- [ ] Resume creation working
- [ ] PDF download working
- [ ] All API endpoints responding
- [ ] Mobile responsive
- [ ] Error logging configured
- [ ] Backups scheduled
- [ ] Monitoring active

---

## 🆘 Troubleshooting

### App won't start
```bash
# Check logs
pm2 logs resumeforge
# Or
heroku logs --tail
```

### MongoDB connection failed
- Check connection string
- Verify database user credentials
- Check IP whitelist
- Ensure MongoDB is running

### 502 Bad Gateway
- Check if app is running: `pm2 status`
- Restart app: `pm2 restart resumeforge`
- Check Nginx config: `nginx -t`

### CORS errors
Add to server.js:
```javascript
app.use(cors({
  origin: 'https://your-domain.com'
}));
```

---

**Deployment Status**: Ready for production! 🚀

Choose your hosting option and follow the guide. For help, check the logs and error messages.
