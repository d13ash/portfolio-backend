/**
 * Project Model
 * Stores portfolio projects with descriptions and metadata
 */
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true // Removes whitespace from both ends
  },
  slug: {
    type: String,
    required: true,
    unique: true, // Every project must have a unique slug for URLs
    trim: true,
    lowercase: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true // This will be the full Markdown content
  },
  coverImage: {
    type: String,
    required: true // We will store the URL from Cloudinary here
  },
  technologies: {
    type: [String], // An array of strings
    required: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
