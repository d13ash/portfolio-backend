/**
 * Skills Routes
 * CRUD operations for technical skills
 */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Skill = require('../models/Skill');

// @route   GET /api/skills
// @desc    Get all skills grouped by category
// @access  Public
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json(skills);
  } catch (err) {
    console.error('Get skills error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/skills
// @desc    Add new skill
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, category } = req.body;

    // Basic validation
    if (!name || !category) {
      return res.status(400).json({ msg: 'Name and category are required' });
    }

    const newSkill = new Skill({ name, category });
    const skill = await newSkill.save();
    res.status(201).json(skill);
  } catch (err) {
    console.error('Create skill error:', err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Skill already exists' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(skill);
  } catch (err) {
    console.error('Update skill error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Skill already exists' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    await Skill.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Skill removed successfully' });
  } catch (err) {
    console.error('Delete skill error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
