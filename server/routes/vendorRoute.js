const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to verify admin role
const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Fetch pending vendors
router.get('/pending', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const vendors = await Vendor.find({ status: 'pending' });
    res.status(200).json(vendors);
  } catch (error) {
    console.error('Error fetching pending vendors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve vendor
router.patch('/:vendorId/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    vendor.status = 'approved';
    await vendor.save();

    // Update User model (optional, if isApproved is used)
    await User.findByIdAndUpdate(vendor.userId, { isApproved: true });

    res.status(200).json({ message: 'Vendor approved successfully' });
  } catch (error) {
    console.error('Error approving vendor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject vendor
router.patch('/:vendorId/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    vendor.status = 'rejected';
    await vendor.save();

    // Update User model (optional)
    await User.findByIdAndUpdate(vendor.userId, { isApproved: false });

    res.status(200).json({ message: 'Vendor rejected successfully' });
  } catch (error) {
    console.error('Error rejecting vendor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// From previous context: Save vendor details
router.post('/details', authMiddleware, async (req, res) => {
    try {
      const vendor = new Vendor({
        userId: req.user.userId,
        fullName: req.body.fullName,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        businessDescription: req.body.businessDescription,
        status: 'pending',
      });
      await vendor.save();
  
      // Update User.profileCompleted
      await User.findByIdAndUpdate(req.user.userId, { profileCompleted: true });
  
      res.status(200).json({ success: true, message: 'Vendor details saved successfully' });
    } catch (error) {
      console.error('Error saving vendor details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;