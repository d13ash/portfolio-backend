/**
 * Blog Routes
 * CRUD operations for blog posts
 */
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all blog posts (sorted by newest first)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedDate: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Get blogs error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/blogs/:id
// @desc    Get single blog post by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    
    res.json(blog);
  } catch (err) {
    console.error('Get blog error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create new blog post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, slug, summary, content, coverImage, tags } = req.body;

    // Basic validation
    if (!title || !slug || !summary || !content || !coverImage) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    const newBlog = new Blog({
      title,
      slug,
      summary,
      content,
      coverImage,
      tags: tags || []
    });

    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Create blog error:', err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Blog slug already exists' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog post
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(blog);
  } catch (err) {
    console.error('Update blog error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Blog slug already exists' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Blog post removed successfully' });
  } catch (err) {
    console.error('Delete blog error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
