const router = require('express').Router();
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

// All routes protected
router.use(auth);

// GET all customers (with search + filter)
router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (status && status !== 'All') query.status = status;
    const customers = await Customer.find(query).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single customer
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create customer
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, status, service, value, notes } = req.body;
    if (!name || !email || !phone || !company || !service || value === undefined)
      return res.status(400).json({ message: 'All required fields must be filled' });
    const customer = await Customer.create({ name, email, phone, company, status, service, value, notes });
    res.status(201).json(customer);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email already exists' });
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update customer
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE customer
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;