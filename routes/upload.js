/**
 * Upload Routes
 * Handles image uploads to Cloudinary
 */
const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const auth = require('../middleware/auth');

// @route   POST /api/upload
// @desc    Upload image to Cloudinary
// @access  Private
router.post('/', [auth, upload.single('image')], (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Return the Cloudinary URL
    res.json({ 
      imageUrl: req.file.path,
      publicId: req.file.filename,
      msg: 'Image uploaded successfully'
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ msg: 'Server error during upload' });
  }
});

module.exports = router;
