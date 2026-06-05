const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST: Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email address' });
    }

    // Create new instance
    user = new User({ name, email, password });
    await user.save(); // This triggers the pre-save hook we just fixed!

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (err) {
    console.error("❌ REGISTRATION ROUTE ERROR:", err);
    res.status(500).json({ message: 'Server error during registration process.', error: err.message });
  }
});

module.exports = router;