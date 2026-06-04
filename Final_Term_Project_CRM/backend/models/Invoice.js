const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceRef: { type: String, unique: true },
  customer:   { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  services: [{
    description: String,
    amount: Number,
  }],
  total:     { type: Number },
  issuedDate: { type: Date, default: Date.now },
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

invoiceSchema.pre('save', function (next) {
  if (!this.invoiceRef) {
    this.invoiceRef = 'INV-' + Date.now().toString(36).toUpperCase();
  }
  this.total = this.services.reduce((sum, s) => sum + s.amount, 0);
  next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);