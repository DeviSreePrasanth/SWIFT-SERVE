const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: String,
  contactEmail: String,
  phone: String,
  address: String,
  services: [{
    name: String,
    photo: String,
    price:Number
  }],
  categories: [{
    type: String,
    enum: ['Plumbing', 'Electrical', 'Cleaning', 'IT', 'Painting', 'Maintenance'],
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vendor', vendorSchema);