/**
 * Index Routes
 * Basic API health check and information
 */
const express = require('express');
const router = express.Router();

// @route   GET /
// @desc    API health check
// @access  Public
router.get('/', function(req, res, next) {
  res.json({
    message: 'Portfolio Backend API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      blogs: '/api/blogs',
      skills: '/api/skills',
      achievements: '/api/achievements',
      contacts: '/api/contacts',
      upload: '/api/upload'
    }
  });
});

module.exports = router;
