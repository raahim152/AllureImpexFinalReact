# Allure Impex - Full Stack React Application

A comprehensive full-stack web application for Allure Impex, a packaging solutions company. Built with React frontend, Node.js/Express backend, MongoDB database, and Cloudinary for file uploads.

## 🚀 Features

- **Modern React Frontend**: Built with React 18, React Router, and Tailwind CSS
- **Express Backend**: RESTful API with JWT authentication
- **MongoDB Database**: NoSQL database for flexible data storage
- **File Upload System**: Cloudinary integration for image uploads
- **Admin Dashboard**: Complete admin panel for managing products, users, and messages
- **User Authentication**: Secure login/registration system
- **Responsive Design**: Mobile-first approach with modern UI
- **Real-time Features**: Dynamic dashboard with live data updates

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Cloudinary Setup](#cloudinary-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 16.0.0 or higher (recommended: 18.x LTS)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version` and `npm --version`

- **MongoDB**: Local installation or MongoDB Atlas account
  - Local: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
  - Atlas: Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)

- **Git**: For cloning the repository
  - Download from [git-scm.com](https://git-scm.com/)

- **Code Editor**: VS Code recommended (with REST Client extension for API testing)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd allure-impex-react
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables** (see [Environment Configuration](#environment-configuration))

4. **Start MongoDB** (if using local installation)
   ```bash
   # On Windows (if installed as service)
   net start MongoDB

   # Or run manually
   mongod
   ```

5. **Start the application**
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev

   # Terminal 2: Start frontend
   npm run dev
   ```

6. **Create admin user**
   ```bash
   cd backend
   node createAdmin.js
   ```

7. **Access the application**
   - Frontend: http://localhost:5173 (or your configured port)
   - Backend API: http://localhost:5000

## 📝 Detailed Setup

### Step 1: Clone and Navigate

```bash
# Clone the repository
git clone <your-repo-url>
cd allure-impex-react

# Verify the structure
ls -la
```

### Step 2: Install Dependencies

```bash
# Install frontend dependencies (React app)
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 3: Environment Configuration

Create the following environment files:

**Backend (.env in backend/ folder):**
```bash
# Database
MONGO_URI=mongodb://localhost:27017/allureimpex
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/allureimpex

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=allure-impex-uploads

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Frontend (.env in root folder):**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Database Setup

#### Option A: Local MongoDB

1. **Install MongoDB Community Edition**
   - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB**
   ```bash
   # Windows (as service)
   net start MongoDB

   # Or run manually
   mongod --dbpath "C:\data\db"
   ```

3. **Verify connection**
   ```bash
   mongo
   # Should connect to local MongoDB
   ```

#### Option B: MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas account**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a free cluster

2. **Get connection string**
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password

3. **Whitelist your IP**
   - In Network Access, add your IP address (or 0.0.0.0/0 for all)

### Step 5: Cloudinary Setup (Optional but Recommended)

1. **Create Cloudinary account**
   - Go to [cloudinary.com](https://cloudinary.com/)
   - Sign up for free account

2. **Get API credentials**
   - Go to Dashboard → Account Details
   - Copy Cloud Name, API Key, and API Secret

3. **Configure in backend/.env**
   ```bash
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLOUDINARY_FOLDER=allure-impex-uploads
   ```

### Step 6: Running the Application

#### Development Mode

**Start Backend:**
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

**Start Frontend:**
```bash
# From project root
npm run dev
# Frontend will start on http://localhost:5173
```

#### Production Build

```bash
# Build frontend for production
npm run build

# The build files will be in the 'dist' folder
# Serve these files using a static server or integrate with backend
```

### Step 7: Create Admin User

```bash
cd backend
node createAdmin.js
```

This creates a default admin user:
- **Email:** admin@allureimpex.com
- **Password:** admin123

**⚠️ Important:** Change the default password after first login!

## 🧪 Testing

### API Testing

Use the provided `test-api.http` file in the backend folder:

1. **Install VS Code REST Client extension**
2. **Open `backend/test-api.http`**
3. **Click "Send Request" on any request**

### Manual Testing

1. **Register a new user** at http://localhost:5173/register
2. **Login** at http://localhost:5173/login
3. **Access admin dashboard** at http://localhost:5173/admin (admin only)
4. **Test file uploads** in the admin dashboard
5. **Send contact messages** and view them in admin panel

### Database Verification

```bash
# Connect to MongoDB
mongo

# Switch to your database
use allureimpex

# Check collections
show collections

# View users
db.users.find()

# View products
db.products.find()

# View messages
db.messages.find()
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Product Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### User Management (Admin Only)

- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Message Endpoints

- `GET /api/messages` - Get all messages (admin only)
- `POST /api/messages` - Send message (public)
- `PUT /api/messages/:id/read` - Mark as read (admin only)
- `DELETE /api/messages/:id` - Delete message (admin only)

### File Upload Endpoints

- `POST /api/uploads` - Upload files (admin only)

## 📁 Project Structure

```
allure-impex-react/
├── backend/                    # Express.js backend
│   ├── config/
│   │   └── cloudinary.js      # Cloudinary configuration
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── models/               # MongoDB models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Message.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── users.js
│   │   ├── messages.js
│   │   └── uploads.js
│   ├── createAdmin.js        # Admin user creation script
│   ├── server.js            # Main server file
│   ├── test-api.http        # API testing file
│   └── package.json
├── src/                     # React frontend
│   ├── components/          # Reusable components
│   │   ├── Layout/
│   │   ├── Shared/
│   │   ├── UI/
│   │   └── FileUpload.jsx
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── adDash.jsx      # Admin dashboard
│   │   ├── Login.jsx
│   │   └── ...
│   ├── services/           # API service functions
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── ...
│   └── styles/            # Global styles
├── public/                # Static assets
├── package.json          # Frontend dependencies
├── tailwind.config.js    # Tailwind CSS config
├── postcss.config.js     # PostCSS config
└── README.md            # This file
```

## 🚀 Deployment

### Backend Deployment

1. **Environment Variables**: Set all required environment variables in your hosting platform
2. **Database**: Use MongoDB Atlas for production
3. **Build**: No build step required for backend
4. **Start**: `npm start` or `node server.js`

### Frontend Deployment

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Any static hosting service

3. **Update API URL**: Change `REACT_APP_API_URL` to your production backend URL

### Recommended Deployment Platforms

- **Backend**: Heroku, Railway, Render, DigitalOcean App Platform
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: MongoDB Atlas

## 🔧 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: MongoServerError: bad auth Authentication failed
```
- Check `MONGO_URI` in backend/.env
- Verify MongoDB is running (local) or credentials (Atlas)
- Check network access for Atlas

**2. JWT Token Errors**
```
JsonWebTokenError: invalid signature
```
- Verify `JWT_SECRET` is set and matches between requests
- Check token expiration (default: 7 days)

**3. File Upload Failures**
```
Error: Cloudinary upload failed
```
- Verify Cloudinary credentials in backend/.env
- Check Cloudinary account limits
- Ensure proper file formats

**4. CORS Errors**
```
Access to XMLHttpRequest blocked by CORS policy
```
- Backend should handle CORS automatically
- Check if backend is running on correct port
- Verify `REACT_APP_API_URL` in frontend

**5. Build Errors**
```
Module not found: Can't resolve 'react-router-dom'
```
- Run `npm install` in correct directory
- Check package.json for missing dependencies

### Debug Mode

Enable debug logging:

```bash
# Backend
DEBUG=* npm run dev

# Frontend (in browser console)
localStorage.debug = '*'
```

### Reset Database

To completely reset the database:

```bash
# Connect to MongoDB
mongo

# Drop database
use allureimpex
db.dropDatabase()

# Recreate admin user
cd backend
node createAdmin.js
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**: `git commit -am 'Add some feature'`
6. **Push to the branch**: `git push origin feature/your-feature`
7. **Submit a pull request**

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test API endpoints using `test-api.http`
- Update README for new features
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review existing GitHub issues
3. Create a new issue with:
   - Detailed description
   - Steps to reproduce
   - Environment details
   - Error logs

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database
- Cloudinary for seamless file uploads
- Tailwind CSS for the utility-first styling approach

---

**Happy coding! 🎉**

```bash
npm install
```

2. Install backend deps:

```bash
cd backend
npm install
```

## Run locally

Open two terminals.

- Backend

```bash
cd backend
npm run dev
```

This starts the Express API (default port `5000` unless `PORT` set).

- Frontend

```bash
# from project root
npm run dev
```

The frontend dev server (Vite/CRA) will start and proxy API requests to the backend if configured.

Run both concurrently (example using separate terminals). You can add `concurrently` to run both in one command if you prefer.

## Create admin user

There is a helper script at `backend/createAdmin.js`. To run it:

```bash
cd backend
node createAdmin.js
```

## API testing

- There is a `backend/test-api.http` file with example requests (use VS Code REST Client or Postman).

## Deployment notes

- Use MongoDB Atlas for production DB.
- Set Cloudinary credentials in production environment.
- Build frontend for production:

```bash
npm run build
```

Serve the `build` (or `dist`) directory from a static host or integrate with your backend.

## Troubleshooting

- If backend can't connect to MongoDB, verify `MONGO_URI` and that `mongod` is running.
- If uploads fail, verify Cloudinary keys and folder names.
- Check backend logs (console) for stack traces.

## Useful files

- `backend/server.js` — API entrypoint
- `backend/routes/` — API routes
- `src/services/` — client API services

## Contributing

PRs and issues welcome. Run linters/tests (if present) before submitting.

## License

This project does not include a license file. Add one if you plan to publish.
