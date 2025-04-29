const Vendor = require('../models/Vendor');

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getVendorsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const vendors = await Vendor.find({ categories: category });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
