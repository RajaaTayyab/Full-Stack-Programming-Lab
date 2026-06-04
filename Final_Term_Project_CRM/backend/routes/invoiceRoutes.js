const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const protect = require('../middleware/authMiddleware');

router.use(protect);

// Generate invoice
router.post('/generate', async (req, res) => {
  const { customerId, services } = req.body;
  if (!customerId || !services?.length)
    return res.status(400).json({ message: 'Customer and services required' });

  const invoice = await Invoice.create({
    customer: customerId,
    services,
    createdBy: req.user.id,
  });

  await invoice.populate('customer');
  res.status(201).json(invoice);
});

// Get invoices for a customer
router.get('/by-customer/:id', async (req, res) => {
  const invoices = await Invoice.find({ customer: req.params.id })
    .populate('customer')
    .sort({ createdAt: -1 });
  res.json(invoices);
});

// Get single invoice
router.get('/:id', async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate('customer');
  if (!invoice) return res.status(404).json({ message: 'Not found' });
  res.json(invoice);
});

module.exports = router;