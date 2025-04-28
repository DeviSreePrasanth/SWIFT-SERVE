const Vendor = require('../models/vendorSchema');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
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
      username,
      email,
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
      !req.file ||
      !username ||
      !email
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

    // Get user ID from JWT token
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = decoded.userId; // Assuming userId is stored in the token payload

    // Check if user exists and has vendor role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'vendor') {
      return res.status(403).json({ message: 'Only vendors can submit vendor details' });
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
      document: req.file.path,
      username,
      email,
      status: 'pending',
    });

    // Save vendor details
    await vendor.save();

    // Update user's profileCompleted field
    await User.findByIdAndUpdate(
      userId,
      { profileCompleted: true },
      { new: true }
    );

    // Respond with success
    res.status(200).json({ message: 'Vendor details submitted successfully, awaiting approval' });
  } catch (error) {
    console.error('Error saving vendor details:', error);
    if (error.code === 11000) { // MongoDB duplicate key error
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({ message: error.message || 'Error saving vendor details' });
  }
};

// Export the controller and multer middleware
module.exports = {
  submitVendorDetails,
  uploadVendorDocument: upload.single('document'),
};