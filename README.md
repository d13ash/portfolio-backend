# Portfolio Backend API

A robust RESTful API backend for a personal portfolio website built with Node.js, Express.js, and MongoDB. Features JWT authentication, image upload to Cloudinary, and full CRUD operations for managing portfolio content.

## 🚀 Features

- **Authentication System**: JWT-based authentication with secure password hashing
- **Portfolio Management**: Complete CRUD operations for projects, blogs, skills, and achievements
- **Image Upload**: Seamless image upload integration with Cloudinary
- **Social Media Links**: Management of contact information and social media links
- **Input Validation**: Comprehensive data validation and error handling
- **MongoDB Integration**: Efficient data storage with Mongoose ODM
- **CORS Support**: Configured for cross-origin requests
- **Production Ready**: Optimized for deployment with proper error handling

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🛠 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary Account** (for image uploads)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd portfolio-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install development dependencies (optional)**
   ```bash
   npm install nodemon --save-dev
   ```

4. **Set up environment variables** (see [Environment Variables](#environment-variables))

5. **Start the application**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in your environment variables).

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/portfolio
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT Secret (use a strong, unique secret in production)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 🔑 How to get Cloudinary credentials:
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy the Cloud Name, API Key, and API Secret

### 🗄️ MongoDB Setup:
- **Local MongoDB**: Install MongoDB locally and use `mongodb://localhost:27017/portfolio`
- **MongoDB Atlas**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas) and use the connection string

## 🛣 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register admin user | Public* |
| POST | `/api/auth/login` | Login user | Public |

*Note: Registration should be disabled in production after creating admin user.

### Projects
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create new project | Private |
| PUT | `/api/projects/:id` | Update project | Private |
| DELETE | `/api/projects/:id` | Delete project | Private |

### Blogs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/blogs` | Get all blog posts | Public |
| GET | `/api/blogs/:id` | Get single blog post | Public |
| POST | `/api/blogs` | Create new blog post | Private |
| PUT | `/api/blogs/:id` | Update blog post | Private |
| DELETE | `/api/blogs/:id` | Delete blog post | Private |

### Skills
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/skills` | Get all skills | Public |
| POST | `/api/skills` | Add new skill | Private |
| PUT | `/api/skills/:id` | Update skill | Private |
| DELETE | `/api/skills/:id` | Delete skill | Private |

### Achievements
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/achievements` | Get all achievements | Public |
| GET | `/api/achievements/:id` | Get single achievement | Public |
| POST | `/api/achievements` | Add new achievement | Private |
| PUT | `/api/achievements/:id` | Update achievement | Private |
| DELETE | `/api/achievements/:id` | Delete achievement | Private |

### Contacts
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/contacts` | Get all contact links | Public |
| GET | `/api/contacts/:id` | Get single contact | Public |
| POST | `/api/contacts` | Add new contact | Private |
| PUT | `/api/contacts/:id` | Update contact | Private |
| DELETE | `/api/contacts/:id` | Delete contact | Private |

### File Upload
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/upload` | Upload image to Cloudinary | Private |

### Health Check
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | API health check and endpoints | Public |

## 🏗 Models

### Project Model
```javascript
{
  title: String (required),
  slug: String (required, unique),
  summary: String (required, max 200 chars),
  description: String (required), // Markdown content
  coverImage: String (required), // Cloudinary URL
  technologies: [String] (required),
  liveUrl: String (optional),
  githubUrl: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model
```javascript
{
  title: String (required),
  slug: String (required, unique),
  summary: String (required, max 300 chars),
  content: String (required), // Markdown content
  coverImage: String (required), // Cloudinary URL
  tags: [String],
  publishedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Skill Model
```javascript
{
  name: String (required, unique),
  category: String (required), // Enum: Programming, Web Development, Databases, Tools & Platforms, Cloud & DevOps
  createdAt: Date,
  updatedAt: Date
}
```

### Achievement Model
```javascript
{
  title: String (required),
  issuer: String (optional),
  url: String (optional),
  isCertification: Boolean (default: false),
  date: String (flexible format),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Model
```javascript
{
  sitename: String (required),
  link: String (required, must be valid URL),
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
```javascript
{
  username: String (required, unique, 3-20 chars),
  password: String (required, min 6 chars, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Authentication

This API uses JWT (JSON Web Tokens) for authentication. 

### Getting Started:
1. **Register an admin user** (do this once):
   ```bash
   POST /api/auth/register
   Content-Type: application/json
   
   {
     "username": "admin",
     "password": "your_secure_password"
   }
   ```

2. **Login to get token**:
   ```bash
   POST /api/auth/login
   Content-Type: application/json
   
   {
     "username": "admin",
     "password": "your_secure_password"
   }
   ```

3. **Use token for protected routes**:
   ```bash
   GET /api/projects
   x-auth-token: your_jwt_token_here
   ```

### Token Details:
- **Expires**: 5 hours after login
- **Header**: Include token in `x-auth-token` header
- **Format**: Bearer token (JWT)

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production` in your environment
2. Use a strong, unique `JWT_SECRET`
3. Set up MongoDB Atlas for cloud database
4. Configure Cloudinary for image storage

### Deployment Platforms

#### Heroku
1. Install Heroku CLI
2. Create new Heroku app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set MONGO_URI=...`
4. Deploy: `git push heroku main`

#### Railway
1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

#### DigitalOcean App Platform
1. Connect repository
2. Configure environment variables
3. Set build and run commands

#### AWS/Vercel/Netlify
Configure according to platform-specific requirements.

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Configure MongoDB Atlas
- [ ] Set up Cloudinary
- [ ] Enable HTTPS
- [ ] Configure CORS for your frontend domain
- [ ] Set NODE_ENV=production
- [ ] Disable registration endpoint (comment out route)
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

## 📁 Project Structure

```
portfolio-backend/
├── bin/
│   └── www                 # Server startup file
├── config/
│   └── cloudinary.js       # Cloudinary configuration
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   ├── Achievement.js      # Achievement model
│   ├── Blog.js             # Blog model
│   ├── Contact.js          # Contact model
│   ├── Project.js          # Project model
│   ├── Skill.js            # Skill model
│   └── User.js             # User model
├── routes/
│   ├── achievements.js     # Achievement routes
│   ├── auth.js             # Authentication routes
│   ├── blogs.js            # Blog routes
│   ├── contacts.js         # Contact routes
│   ├── index.js            # Health check routes
│   ├── projects.js         # Project routes
│   ├── skills.js           # Skill routes
│   ├── upload.js           # File upload routes
│   └── users.js            # User routes (placeholder)
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── app.js                  # Express app configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🛠 Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (not implemented yet)

### Adding New Features
1. Create model in `/models`
2. Create routes in `/routes`
3. Add routes to `app.js`
4. Update this README

### Code Style
- Use consistent commenting for all routes
- Include proper error handling
- Validate input data
- Use meaningful variable names
- Follow REST conventions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you have any questions or need help setting up the project, please:
1. Check the documentation above
2. Search existing issues
3. Create a new issue with detailed information

## 🔗 Related Projects

- **Frontend Repository**: [Link to your frontend repo]
- **Live Demo**: [Link to your deployed portfolio]

---

**Built with ❤️ using Node.js, Express.js, and MongoDB**
