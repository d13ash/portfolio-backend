/**
 * Contact Model
 * Stores social media links and contact information
 */
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    sitename: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
});

module.exports = mongoose.model('Contact', ContactSchema);