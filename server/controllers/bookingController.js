const Booking = require('../models/Booking');
const Cart = require('../models/CartSchema');
const Service = require('../models/Service');

exports.createBooking = async (req, res) => {
  try {
    const { userId, timeSlot, vendorId } = req.body;

    // Validate input
    if (!userId || !timeSlot || !vendorId) {
      console.error('Validation failed: Missing required fields', { userId, timeSlot, vendorId });
      return res.status(400).json({ error: 'userId, timeSlot, and vendorId are required' });
    }

    // Validate timeSlot format (basic check for "YYYY-MM-DD HH:MM")
    const timeSlotRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!timeSlotRegex.test(timeSlot)) {
      console.error('Validation failed: Invalid timeSlot format', { timeSlot });
      return res.status(400).json({ error: 'timeSlot must be in format YYYY-MM-DD HH:MM' });
    }

    // Fetch cart items for the user
    const cartItems = await Cart.find({ userId }).populate('service');
    if (!cartItems.length) {
      console.error('Cart empty', { userId });
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Validate vendor and services
    for (const item of cartItems) {
      if (!item.service) {
        console.error('Invalid service in cart', { serviceId: item.service });
        return res.status(400).json({ error: `Invalid service in cart: ${item.service}` });
      }
      if (item.service.vendor.toString() !== vendorId) {
        console.error('Vendor mismatch', { vendorId, serviceVendor: item.service.vendor });
        return res.status(400).json({ error: 'All services must belong to the same vendor' });
      }
    }

    // Create booking
    const booking = new Booking({
      userId,
      services: cartItems.map(item => ({
        service: item.service._id,
        quantity: item.quantity,
      })),
      vendor: vendorId,
      timeSlot,
    });
    await booking.save();

    // Clear the cart
    await Cart.deleteMany({ userId });
    console.log('Booking created and cart cleared', { bookingId: booking._id, userId });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error in createBooking:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};