const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile Number is required'],
    match: [/^\d{10}$/, 'Enter a valid 10-digit mobile number']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  postalCode: {
    type: String,
    required: [true, 'Postal Code is required'],
    match: [/^\d{5,6}$/, 'Enter a valid postal code (5-6 digits)']
  },
  businessDescription: {
    type: String,
    required: [true, 'Business Description is required'],
    trim: true
  }
}, {
  timestamps: true
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
