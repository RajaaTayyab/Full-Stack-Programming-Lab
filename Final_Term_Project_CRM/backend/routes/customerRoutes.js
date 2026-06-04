const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const protect = require('../middleware/authMiddleware');

// All routes protected
router.use(protect);

// GET all customers (with optional search & filter)
router.get('/', async (req, res) => {
  const { search, status } = req.query;
  let query = { createdBy: req.user.id };

  if (status && status !== 'All') query.status = status;
  if (search) query.name = { $regex: search, $options: 'i' };

  const customers = await Customer.find(query).sort({ createdAt: -1 });
  res.json(customers);
});

// GET single customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: 'Not found' });
  res.json(customer);
});

// POST create customer
router.post('/', async (req, res) => {
  const { name, email, phone, company, status, notes } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ message: 'Name, email, phone required' });

  const customer = await Customer.create({
    name, email, phone, company, status, notes,
    createdBy: req.user.id,
  });
  res.status(201).json(customer);
});

// PUT update customer
router.put('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id, req.body, { new: true, runValidators: true }
  );
  if (!customer) return res.status(404).json({ message: 'Not found' });
  res.json(customer);
});

// DELETE customer
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Customer deleted' });
});

module.exports = router;