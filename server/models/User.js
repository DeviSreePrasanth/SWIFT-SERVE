const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true, // Allows null/undefined values
  },
  role: {
    type: String,
    enum: ['customer', 'vendor'],
    default: 'customer',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);