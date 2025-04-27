const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true, match: /^\d{10}$/ },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true, match: /^\d{5,6}$/ },
  businessDescription: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Check if Vendor model already exists
module.exports = mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);
