const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

const authController = {
  signup: async (req, res, next) => {
    const { name, email, password, role } = req.body;

    try {
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      if (!['customer', 'vendor', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        isApproved: role === 'vendor' ? false : true,
        profileCompleted: false,
      });
      await user.save();

      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Signup error:', error);
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Incorrect email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect email or password' });
      }

      const payload = {
        userId: user._id,
        role: user.role,
        isApproved: user.isApproved,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isApproved: user.isApproved,
          profileCompleted: user.profileCompleted,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      next(error);
    }
  },

  getUser: async (req, res, next) => {
    console.log('Get user request:', { userId: req.user?.userId });
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
        profileCompleted: user.profileCompleted,
      });
    } catch (error) {
      console.error('Get user error:', error);
      next(error);
    }
  },

  getstatus: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: No user data available' });
      }
      const vendor = await Vendor.findOne({ userId: req.user.userId });
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
      res.status(200).json({
        isApproved: vendor.status === 'approved',
        isRejected: vendor.status === 'rejected',
      });
    } catch (error) {
      console.error('Error checking status:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = authController;