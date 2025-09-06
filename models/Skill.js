/**
 * Skill Model
 * Stores technical skills organized by category
 */
const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Web Development', 'Databases', 'Tools & Platforms']
  }
});

module.exports = mongoose.model('Skill', SkillSchema);
