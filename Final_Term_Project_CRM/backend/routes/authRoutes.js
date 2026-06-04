const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.cookie('nexcrm_token', token, {
    httpOnly: true,
    secure: false, // set true in production with HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ _id: user._id, name: user.name, email: user.email });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id);
  res.cookie('nexcrm_token', token, {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ _id: user._id, name: user.name, email: user.email });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('nexcrm_token');
  res.json({ message: 'Logged out' });
});

// GET /api/auth/me  (verify session)
router.get('/me', async (req, res) => {
  const token = req.cookies.nexcrm_token;
  if (!token) return res.status(401).json({ message: 'Not logged in' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;