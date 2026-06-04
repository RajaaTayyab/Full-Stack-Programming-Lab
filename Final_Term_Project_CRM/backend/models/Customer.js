const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true },
  phone:   { type: String, required: true },
  company: { type: String },
  status:  { type: String, enum: ['Lead', 'Active', 'Inactive'], default: 'Lead' },
  notes:   { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);