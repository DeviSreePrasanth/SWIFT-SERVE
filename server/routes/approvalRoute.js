const express = require('express');
const router = express.Router();
const Vendor = require('../models/vendorSchema');

// Get all pending vendors
router.get('/admin/pending-vendors', async (req, res) => {
  try {
    const vendors = await Vendor.find({ status: 'pending' });
    res.status(200).json(vendors);
  } catch (error) {
    console.error('Error fetching pending vendors:', error);
    res.status(500).json({ message: 'Error fetching vendors' });
  }
});

// Update vendor status (approve/reject)
router.put('/admin/vendor-status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({ message: `Vendor ${status} successfully`, vendor });
  } catch (error) {
    console.error('Error updating vendor status:', error);
    res.status(500).json({ message: 'Error updating vendor status' });
  }
});

module.exports = router;