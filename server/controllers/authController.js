const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
  signup: async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
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
        role: 'customer',
      });
      await user.save();

      res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Incorrect username or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!user || !isMatch) {
        return res.status(400).json({ message: 'Incorrect username or password' });
      }

      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
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
      res.status(200).json({ name: user.name, email: user.email, role: user.role });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;