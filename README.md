# ResumeForge - Professional Resume Builder

A comprehensive, modern resume builder web application built with HTML, CSS (Tailwind), JavaScript, Node.js, Express, and MongoDB.

## 🚀 Features

### User Features
- ✅ User registration and authentication (JWT-based)
- ✅ Profile management with personal information
- ✅ Create, edit, and delete multiple resumes
- ✅ Real-time resume preview
- ✅ Multiple professional templates
- ✅ Customizable color schemes and fonts
- ✅ PDF export with professional formatting
- ✅ Resume duplication
- ✅ Public resume sharing with unique URLs
- ✅ Responsive mobile-friendly design
- ✅ Step-by-step resume builder wizard
- 🔄 Multi-language support (coming soon)
- 🔄 DOCX export (coming soon)
- 🔄 AI-powered suggestions (coming soon)
- 🔄 Cover letter builder (coming soon)

### Security Features
- Secure password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- CORS protection
- Role-based access control

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/resumeforge
   JWT_SECRET=your-super-secret-jwt-key-change-this
   ```

4. **Start MongoDB**
   ```bash
   # Windows
   mongod

   # macOS/Linux
   sudo systemctl start mongod
   ```

5. **Build CSS (in a separate terminal)**
   ```bash
   npm run build:css
   # Or for development with auto-rebuild:
   npm run dev
   ```

6. **Start the server**
   ```bash
   node server.js
   ```

7. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
project resume/
├── config/
│   └── database.js         # MongoDB configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── resumeController.js # Resume CRUD operations
│   └── pdfController.js    # PDF generation
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   └── validation.js       # Input validation
├── models/
│   ├── User.js             # User model
│   └── Resume.js           # Resume model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── resumes.js          # Resume routes
│   └── public.js           # Public routes (shared resumes)
├── services/
│   └── pdfService.js       # PDF generation service
├── pages/
│   ├── homepage.html       # Landing page
│   ├── login.html          # Login page
│   ├── register.html       # Registration page
│   ├── resume_builder.html # Resume builder interface
│   └── dashboard.html      # User dashboard (to be created)
├── css/
│   ├── tailwind.css        # Tailwind source
│   ├── main.css            # Compiled CSS
│   └── overrides.css       # Custom styles
├── js/
│   └── resume_builder.js   # Resume builder logic
├── cypress/
│   └── e2e/                # End-to-end tests
├── server.js               # Express server
├── package.json
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `PUT /api/auth/change-password` - Change password (protected)
- `DELETE /api/auth/account` - Delete account (protected)

### Resumes
- `POST /api/resumes` - Create new resume (protected)
- `GET /api/resumes` - Get all user's resumes (protected)
- `GET /api/resumes/:id` - Get specific resume (protected)
- `PUT /api/resumes/:id` - Update resume (protected)
- `DELETE /api/resumes/:id` - Delete resume (protected)
- `POST /api/resumes/:id/duplicate` - Duplicate resume (protected)
- `POST /api/resumes/:id/share` - Generate share link (protected)
- `GET /api/resumes/:id/download` - Download PDF (protected)
- `GET /api/resumes/:id/preview` - Preview PDF (protected)

### Public
- `GET /api/share/:shareId` - Access shared resume

## 🧪 Testing

```bash
# Run Cypress E2E tests
npx cypress open

# Run tests in headless mode
npx cypress run
```

## 🎨 Customization

### Templates
Templates are defined in `services/pdfService.js`. To add new templates:
1. Create new template HTML generator function
2. Add template selector logic
3. Update Resume model to include new template ID

### Styling
- Tailwind configuration: `tailwind.config.js`
- Custom styles: `css/overrides.css`
- Rebuild CSS after changes: `npm run build:css`

## 🚀 Deployment

### Hosting Options
- **Vercel/Netlify**: Frontend deployment
- **Heroku/Railway/Render**: Full-stack deployment
- **DigitalOcean/AWS/GCP**: VPS deployment

### Production Checklist
- [ ] Set strong `JWT_SECRET` in environment variables
- [ ] Use MongoDB Atlas or production database
- [ ] Enable HTTPS/SSL
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS for production domain
- [ ] Set up error logging (e.g., Sentry)
- [ ] Configure backups for database
- [ ] Set up monitoring and analytics

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/resumeforge
JWT_SECRET=super-secure-random-string-min-32-chars
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### CSS Not Updating
```bash
npm run build:css
```

### Port Already in Use
Change the port in `.env`:
```env
PORT=3001
```

## 📝 Scripts

```bash
# Build CSS
npm run build:css

# Watch CSS (auto-rebuild on changes)
npm run dev

# Run server
node server.js

# Run tests
npx cypress run
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [MongoDB](https://www.mongodb.com/)
- PDF generation with [Puppeteer](https://pptr.dev/)

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue]
- Email: support@resumeforge.com

---

**Made with ❤️ by the ResumeForge Team**
