const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
    signup: async (req, res, next) => {
        try {
          const { name, email, password } = req.body;
          
          if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email' });
          }
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
          }
      
          const user = new User({
            name,
            email,
            password
          });
      
          await user.save();
      
          res.status(201).json({ 
            message: 'Signup successful',
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
          });
        } catch (error) {
          console.error('Signup error:', error);
          if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error: Email already exists' });
          }
          res.status(500).json({ message: 'Server error during signup', error: error.message });
        }
      },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: 'Email and password are required',
          received: req.body 
        });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ 
          success: false,
          message: 'Invalid credentials' 
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ 
          success: false,
          message: 'Invalid credentials' 
        });
      }
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Server error during login',
        error: error.message 
      });
    }
  }
};

module.exports = authController;