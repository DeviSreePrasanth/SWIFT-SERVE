const Vendor = require('../models/vendorSchema');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, or PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

// Controller to handle vendor details submission
const submitVendorDetails = async (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      address,
      city,
      state,
      postalCode,
      businessName,
      businessDescription,
      licenseNumber,
      insuranceDetails,
      serviceCategories,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !mobileNumber ||
      !address ||
      !city ||
      !state ||
      !postalCode ||
      !businessName ||
      !businessDescription ||
      !licenseNumber ||
      !insuranceDetails ||
      !serviceCategories ||
      !req.file
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Parse serviceCategories (sent as JSON string)
    let parsedServiceCategories;
    try {
      parsedServiceCategories = JSON.parse(serviceCategories);
      if (!Array.isArray(parsedServiceCategories) || parsedServiceCategories.length === 0) {
        return res.status(400).json({ message: 'At least one service category is required' });
      }
    } catch (error) {
      return res.status(400).json({ message: 'Invalid service categories format' });
    }

    // Create new vendor
    const vendor = new Vendor({
      fullName,
      mobileNumber,
      address,
      city,
      state,
      postalCode,
      businessName,
      businessDescription,
      licenseNumber,
      insuranceDetails,
      serviceCategories: parsedServiceCategories,
      document: req.file.path, // Store file path
      status: 'pending',
    });

    await vendor.save();
    res.status(200).json({ message: 'Vendor details submitted successfully, awaiting approval' });

    console.log('Vendor details saved:', vendor);
  } catch (error) {
    console.error('Error saving vendor details:', error);
    res.status(500).json({ message: error.message || 'Error saving vendor details' });
  }
};

// Export the controller and multer middleware
module.exports = {
  submitVendorDetails,
  uploadVendorDocument: upload.single('document'),
};