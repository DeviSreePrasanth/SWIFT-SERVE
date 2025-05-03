const Vendor = require('../models/Vendor');
const getVendorAndService = async (req, res) => {
  try {
    const { vendorName, serviceName } = req.query;

    if (!vendorName || !serviceName) {
      return res.status(400).json({
        success: false,
        message: 'Both vendorName and serviceName are required query parameters',
      });
    }
    const vendor = await Vendor.findOne(
      {
        name: { $regex: new RegExp(`^${vendorName}$`, 'i') },
        'services.name': { $regex: new RegExp(`^${serviceName}$`, 'i') },
      },
      {
        name: 1,
        contactEmail: 1,
        phone: 1,
        address: 1,
        categories: 1,
        createdAt: 1,
        services: { $elemMatch: { name: { $regex: new RegExp(`^${serviceName}$`, 'i') } } },
      }
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor or service not found',
      });
    }
    const service = vendor.services[0];

    res.status(200).json({
      success: true,
      data: {
        vendor: {
          _id: vendor._id,
          name: vendor.name,
          contactEmail: vendor.contactEmail,
          phone: vendor.phone,
          address: vendor.address,
          categories: vendor.categories,
          createdAt: vendor.createdAt,
        },
        service: {
          _id: service._id,
          name: service.name,
          photo: service.photo,
          price: service.price,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching vendor and service:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  getVendorAndService,
};
