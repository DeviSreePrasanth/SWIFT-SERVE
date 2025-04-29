const Vendor = require('../models/Vendor');
const Service = require('../models/Service');

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
    const services = await Service.find({ category });
    if (services.length === 0) {
      return res.json([]);
    }
    const vendorIds = services.map(service => service._id);
    const vendors = await Vendor.find({ 'services': { $in: vendorIds } });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
