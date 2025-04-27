const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};