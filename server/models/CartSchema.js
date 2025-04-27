const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Temporary user identifier (e.g., session ID)
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  quantity: { type: Number, required: true, default: 1 },
}, { collection: 'carts' });

module.exports = mongoose.model('Cart', cartSchema);