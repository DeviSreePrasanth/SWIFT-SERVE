const Cart = require('../models/CartSchema');

exports.addToCart = async (req, res) => {
  try {
    const { userId, vendorId, serviceName, category, price, imageUrl } = req.body;
    console.log('Request body:', req.body); // Log the request body for debugging
    console.log('User ID:', userId); // Log the userId for debugging
    console.log('Vendor ID:', vendorId); // Log the vendorId for debugging
    console.log('Service Name:', serviceName); // Log the serviceName for debugging
    console.log('Category:', category); // Log the category for debugging
    console.log('Price:', price); // Log the price for debugging
    console.log('Image URL:', imageUrl); // Log the imageUrl for debugging
    
    // Validate required fields
    if (!userId || !vendorId || !serviceName || !category || price === undefined || !imageUrl) {
      return res.status(400).json({
        message: 'Missing required fields',
        missing: {
          userId: !userId,
          vendorId: !vendorId,
          serviceName: !serviceName,
          category: !category,
          price: price === undefined,
          imageUrl: !imageUrl,
        },
      });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    // Check for duplicate item
    if (cart && cart.items.some((item) => item.vendorId === vendorId && item.serviceName === serviceName)) {
      return res.status(400).json({ message: 'Service already added to cart' });
    }

    const newItem = { vendorId, serviceName, category, price, imageUrl };

    if (!cart) {
      cart = new Cart({ userId, items: [newItem] });
    } else {
      cart.items.push(newItem);
    }

    await cart.save();
    res.status(200).json({ message: 'Service added to cart', cart });
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

exports.getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { vendorId, serviceName } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $pull: {
          items: { vendorId, serviceName },
        },
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for user' });
    }

    res.status(200).json({ message: 'Service removed from cart', cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item from cart', error: err.message });
  }
};