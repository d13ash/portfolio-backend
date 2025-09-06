/**
 * Blog Model
 * Stores blog posts with Markdown content
 */
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true // Full Markdown content
  },
  coverImage: {
    type: String,
    required: true // URL from Cloudinary
  },
  tags: {
    type: [String] // Array of strings like ["Angular", "Node.js"]
  },
  publishedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', BlogSchema);
