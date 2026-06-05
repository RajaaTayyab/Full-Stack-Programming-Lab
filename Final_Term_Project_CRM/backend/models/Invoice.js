const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customerId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  customerName: { type: String, required: true },
  services:     [{ name: String, amount: Number }],
  totalAmount:  { type: Number, required: true },
  date:         { type: Date, default: Date.now },
  invoiceNo:    { type: String, unique: true }
});

// Modern Pre-Validate Hook: Uses async/await directly instead of old next callbacks
invoiceSchema.pre('validate', async function () {
  if (this.customerId && !this.customerName) {
    const Customer = mongoose.model('Customer');
    const associatedCustomer = await Customer.findById(this.customerId);
    if (associatedCustomer) {
      this.customerName = associatedCustomer.name;
    } else {
      throw new Error('Validation Failed: Associated customer record was not found.');
    }
  }
});

// Modern Pre-Save Hook: Handles random indexing synchronously without next callbacks
invoiceSchema.pre('save', function () {
  if (!this.invoiceNo) {
    this.invoiceNo = 'INV-' + Math.floor(100000 + Math.random() * 900000);
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);