/**
 * Projects Routes
 * CRUD operations for portfolio projects
 */
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// @route   GET /api/projects
// @desc    Get all projects (sorted by newest first)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Get projects error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    res.json(project);
  } catch (err) {
    console.error('Get project error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, slug, summary, description, coverImage, technologies, liveUrl, githubUrl } = req.body;

    // Basic validation
    if (!title || !slug || !summary || !description || !coverImage || !technologies) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    const newProject = new Project({
      title,
      slug,
      summary,
      description,
      coverImage,
      technologies,
      liveUrl,
      githubUrl
    });

    const project = await newProject.save();
    res.status(201).json(project);
  } catch (err) {
    console.error('Create project error:', err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Project slug already exists' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(project);
  } catch (err) {
    console.error('Update project error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Project slug already exists' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed successfully' });
  } catch (err) {
    console.error('Delete project error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
