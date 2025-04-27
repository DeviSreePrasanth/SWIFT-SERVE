const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  businessName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  experience: { type: Number, default: 0 }, // Years of experience
  services: [
    {
      serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      serviceRadius: { type: Number, required: true },
    },
  ],
  serviceArea: {
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    radius: { type: Number, required: true },
  },
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  ],
  portfolioImages: [{ type: String }], // URLs to images
  availability: [
    {
      date: { type: Date, required: true },
      timeSlots: [
        {
          start: { type: String, required: true }, // e.g., "09:00"
          end: { type: String, required: true }, // e.g., "10:00"
          isBooked: { type: Boolean, default: false },
        },
      ],
    },
  ],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vendor', vendorSchema);