/**
 * Achievements Routes
 * CRUD operations for achievements and certifications
 */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Achievement = require('../models/Achievement');

// @route   GET /api/achievements
// @desc    Get all achievements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    console.error('Get achievements error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/achievements/:id
// @desc    Get single achievement by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ msg: 'Achievement not found' });
    }
    
    res.json(achievement);
  } catch (err) {
    console.error('Get achievement error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Achievement not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/achievements
// @desc    Add new achievement
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, issuer, url, isCertification, date } = req.body;

    // Basic validation
    if (!title) {
      return res.status(400).json({ msg: 'Title is required' });
    }

    const newAchievement = new Achievement({
      title,
      issuer,
      url,
      isCertification: isCertification || false,
      date
    });

    const achievement = await newAchievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    console.error('Create achievement error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/achievements/:id
// @desc    Update achievement
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ msg: 'Achievement not found' });
    }

    achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(achievement);
  } catch (err) {
    console.error('Update achievement error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Achievement not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/achievements/:id
// @desc    Delete achievement
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ msg: 'Achievement not found' });
    }

    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Achievement removed successfully' });
  } catch (err) {
    console.error('Delete achievement error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Achievement not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
