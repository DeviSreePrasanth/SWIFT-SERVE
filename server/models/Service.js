const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  imageUrl: { type: String } 
});

module.exports = mongoose.model('Service', serviceSchema);
