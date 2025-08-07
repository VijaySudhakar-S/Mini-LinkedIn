# 🌐 Mini LinkedIn - Community Platform

A full-stack social media platform inspired by LinkedIn, built with modern web technologies. Users can register, create profiles, share posts, and connect with others in a professional community environment.

## ✨ Features

### 🔐 Authentication & Security
- **Secure Registration/Login** with JWT authentication
- **Password Hashing** using bcryptjs
- **Protected Routes** and authorization middleware
- **Input Validation** and sanitization

### 👤 User Management
- **Complete User Profiles** with name, email, and bio
- **Profile Editing** functionality
- **User Discovery** through posts and profiles

### 📝 Post Management
- **Create Text Posts** up to 1000 characters
- **Public Feed** with chronological post display
- **Personal Post History** on profile pages
- **Post Deletion** (author only)
- **Real-time Timestamps** with formatted dates

### 🎨 User Interface
- **Responsive Design** that works on all devices
- **Modern UI** with Tailwind CSS
- **Intuitive Navigation** between feed and profile
- **Real-time Feedback** with loading states and error handling
- **Character Counting** for post creation

## 🛠️ Tech Stack

### Frontend
- **React 18** with Hooks and Context API
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive Design** principles

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** middleware

### DevOps & Tools
- **Git** for version control
- **npm** for package management
- **Nodemon** for development
- **Environment Variables** for configuration

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mini-linkedin.git
   cd mini-linkedin
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/mini-linkedin
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

## 📁 Project Structure

```
mini-linkedin/
├── backend/
│   ├── server.js              # Express server and API routes
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles
│   ├── package.json          # Frontend dependencies
│   └── public/
├── screenshots/              # Application screenshots
├── README.md                # This file
└── LICENSE
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
GET    /api/auth/me           # Get current user (protected)
PUT    /api/auth/profile      # Update profile (protected)
```

### Posts
```
POST   /api/posts             # Create new post (protected)
GET    /api/posts             # Get all posts with pagination
DELETE /api/posts/:postId     # Delete post (protected)
```

### Users
```
GET    /api/users/:userId     # Get user profile and posts
```

