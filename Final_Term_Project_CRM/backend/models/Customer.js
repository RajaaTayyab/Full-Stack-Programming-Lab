const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, unique: true, lowercase: true },
  phone:   { type: String, required: true },
  company: { type: String, required: true },
  status:  { type: String, enum: ['Lead', 'Active', 'Inactive'], default: 'Lead' },
  service: { type: String, required: true },
  value:   { type: Number, required: true, min: 0 },
  notes:   { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);