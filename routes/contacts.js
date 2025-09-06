/**
 * Contacts Routes
 * CRUD operations for social media links and contact information
 */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

// @route   GET /api/contacts
// @desc    Get all contact links
// @access  Public
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('Get contacts error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/contacts/:id
// @desc    Get single contact by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    console.error('Get contact error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { sitename, link } = req.body;

    // Basic validation
    if (!sitename || !link) {
      return res.status(400).json({ msg: 'Site name and link are required' });
    }

    const newContact = new Contact({ sitename, link });
    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error('Create contact error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(contact);
  } catch (err) {
    console.error('Update contact error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Contact removed successfully' });
  } catch (err) {
    console.error('Delete contact error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
