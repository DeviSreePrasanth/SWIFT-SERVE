const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Temporary user identifier
  services: [{
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    quantity: { type: Number, required: true },
  }],
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  timeSlot: { type: String, required: true }, // e.g., "2025-04-28 10:00"
  status: { type: String, required: true, default: 'Pending' },
}, { collection: 'bookings' });

module.exports = mongoose.model('Booking', bookingSchema);