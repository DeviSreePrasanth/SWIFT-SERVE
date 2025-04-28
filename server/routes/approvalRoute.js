const express = require('express');
const router = express.Router();
const Vendor = require('../models/vendorSchema');
const User = require('../models/User');
// Get all pending vendors
router.get('/pending-vendors', async (req, res) => {
    try {
      const vendors = await Vendor.find({ status: 'pending' }).select(
        'fullName mobileNumber address city state postalCode businessName businessDescription licenseNumber insuranceDetails serviceCategories document username email status createdAt'
      );
      res.status(200).json({ success: true, data: vendors });
    } catch (error) {
      console.error('Error fetching pending vendors:', error);
      res.status(500).json({ success: false, message: error.message || 'Error fetching pending vendors' });
    }
  });

  
  router.put('/vendor-status', async (req, res) => {
    try {
      const { username, email, status } = req.body;
  
      // Validate status
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }
  
      // Ensure at least one of username or email is provided
      if (!username && !email) {
        return res.status(400).json({ success: false, message: 'Username or email is required' });
      }
  
      // Build query to find vendor by username or email
      const vendorQuery = {};
      if (username) vendorQuery.username = username;
      if (email) vendorQuery.email = email;
  
      // Find and update vendor
      const vendor = await Vendor.findOneAndUpdate(
        vendorQuery,
        { status },
        { new: true, select: 'fullName username email status' }
      );
  
      if (!vendor) {
        return res.status(404).json({ success: false, message: 'Vendor not found' });
      }
  
      // Build query to find user by email (assuming email is the common field)
      const userQuery = {};
      if (email) userQuery.email = email;
      if (username && !email) userQuery.email = vendor.email; // Fallback to vendor's email if only username provided
  
      // Update user approval status
      const userUpdate = {
        isApproved: status === 'approved' ? true : false,
        isRejected: status === 'rejected' ? true : false,
      };
  
      const user = await User.findOneAndUpdate(
        userQuery,
        userUpdate,
        { new: true, select: 'name email isApproved isRejected' }
      );
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({
        success: true,
        message: `Vendor ${status} successfully`,
        vendor,
        user,
      });
    } catch (error) {
      console.error('Error updating vendor status:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error updating vendor status',
      });
    }
  });

module.exports = router;