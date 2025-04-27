const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  timeEstimated: { type: Number, required: true },
}, { collection: 'services' });

module.exports = mongoose.model('Service', serviceSchema);