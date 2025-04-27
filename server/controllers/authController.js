const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
        isApproved: role === 'vendor' ? false : true, // Vendors need approval, others are auto-approved
      });
      await user.save();

      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
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
          vendorProfile: user.vendorProfile || {},
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getUser: async (req, res, next) => {
    try {
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
        vendorProfile: user.vendorProfile || {},
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;