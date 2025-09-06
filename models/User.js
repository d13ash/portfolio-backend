/**
 * User Model
 * Stores admin user credentials for authentication
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false // This prevents the password from being sent in API responses
  }
});

module.exports = mongoose.model('User', UserSchema);
