// Portfolio Backend Application
// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');

// Import route modules
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
const blogsRouter = require('./routes/blogs');
const skillsRouter = require('./routes/skills');
const achievementsRouter = require('./routes/achievements');
const contactsRouter = require('./routes/contacts');


// Initialize Express application
const app = express();

// Configure middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Database connection error:', err));

// API routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/contacts', contactsRouter);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});


module.exports = app;