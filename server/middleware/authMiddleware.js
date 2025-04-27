const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check vendor approval
const checkVendorApproval = (req, res, next) => {
  if (req.user.role === 'vendor' && !req.user.isApproved) {
    return res.status(403).json({ message: 'Vendor profile not yet approved' });
  }
  next();
};

module.exports = { authMiddleware, checkVendorApproval };