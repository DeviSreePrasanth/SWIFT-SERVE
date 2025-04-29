const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: String,
  contactEmail: String,
  phone: String,
  address: String,
  services: [String], // Storing service names directly
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Vendor', vendorSchema);
