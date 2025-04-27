const Cart = require('../models/CartSchema');
const Service = require('../models/Service');

exports.addToCart = async (req, res) => {
  try {
    const { userId, serviceId, quantity = 1 } = req.body;

    // Validate input
    if (!userId || !serviceId) {
      console.error('Validation failed: userId or serviceId missing', { userId, serviceId });
      return res.status(400).json({ error: 'userId and serviceId are required' });
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
      console.error('Validation failed: Invalid quantity', { quantity });
      return res.status(400).json({ error: 'Quantity must be a positive integer' });
    }

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      console.error('Service not found', { serviceId });
      return res.status(404).json({ error: 'Service not found' });
    }

    // Check if service is already in cart
    let cartItem = await Cart.findOne({ userId, service: serviceId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
      console.log('Updated cart item', { cartItem });
    } else {
      cartItem = new Cart({ userId, service: serviceId, quantity });
      await cartItem.save();
      console.log('Created new cart item', { cartItem });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.query;

    // Validate input
    if (!userId) {
      console.error('Validation failed: userId missing', { userId });
      return res.status(400).json({ error: 'userId is required' });
    }

    // Fetch cart items for the user
    const cartItems = await Cart.find({ userId }).populate('service', 'name category price timeEstimated');
    res.json(cartItems);
  } catch (error) {
    console.error('Error in getCart:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};