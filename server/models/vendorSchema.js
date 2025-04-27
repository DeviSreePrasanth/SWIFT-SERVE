const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  mobileNumber: { type: String, required: true, match: [/^\d{10}$/, 'Invalid mobile number'] },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, match: [/^\d{5,6}$/, 'Invalid postal code'] },
  businessName: { type: String, required: true, trim: true },
  businessDescription: { type: String, required: true, trim: true },
  licenseNumber: { type: String, required: true, trim: true },
  insuranceDetails: { type: String, required: true, trim: true },
  serviceCategories: { 
    type: [String], 
    required: true, 
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'At least one service category is required',
    }
  },
  document: { type: String, required: true }, // Stores file path or URL
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
}, { collection: 'vendors' }); // <-- Added collection name here

module.exports = mongoose.model('Vendor', vendorSchema);
