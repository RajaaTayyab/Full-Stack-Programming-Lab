const router = require('express').Router();
const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

// Protect all billing routes with JWT auth middleware
router.use(auth);

// POST: Generate and Save Invoice
router.post('/', async (req, res) => {
  try {
    const { customerId, services } = req.body;

    // 1. Validate payload inputs
    if (!customerId || !services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: 'Invalid payload: Missing customerId or service items.' });
    }

    // 2. Locate target customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer record not found in system database.' });
    }

    // 3. Cleanly compute total amount server-side safely
    const totalAmount = services.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

    // 4. Create and push the document into the cluster
    const newInvoice = new Invoice({
      customerId,
      customerName: customer.name,
      services,
      totalAmount
    });

    const savedInvoice = await newInvoice.save();
    
    // Success response
    res.status(201).json(savedInvoice);

  } catch (err) {
    // CRUCIAL FOR DEBUGGING: This prints out exactly why MongoDB is rejecting the block
    console.error("❌ INVOICE GENERATION ERROR TRACE:", err);
    
    // Handle duplicate serial errors gracefully
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Database conflict: Duplicate Invoice Number detected. Try again.' });
    }

    res.status(500).json({ message: 'Server error processing invoice creation logs.', error: err.message });
  }
});

// GET: Retrieve All System Invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.json(invoices);
  } catch (err) {
    console.error("❌ FETCH INVOICES ERROR:", err);
    res.status(500).json({ message: 'Server error fetching invoice records.' });
  }
});

module.exports = router;