const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: String,
    username:{
      type: String,
      required: true,
      unique: true
    },
    contactEmail: String,
    phone: String,
    address: String,
    services: [String],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  

module.exports = mongoose.model('Vendor', vendorSchema);
