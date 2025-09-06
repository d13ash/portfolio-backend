/**
 * Achievement Model
 * Stores certifications, awards, and achievements
 */
const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  isCertification: {
    type: Boolean,
    default: false
  },
  date: {
    type: String // Using string for flexibility e.g., "Aug 2025" or "Dec 2024"
  }
});

module.exports = mongoose.model('Achievement', AchievementSchema);
