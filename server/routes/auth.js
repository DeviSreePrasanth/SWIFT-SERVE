const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', (req, res, next) => {
  const { type } = req.body;

  if (type === 'signup') {
    return authController.signup(req, res, next);
  } else if (type === 'login') {
    return authController.login(req, res, next);
  } else {
    return res.status(400).json({ message: 'Invalid request type' });
  }
});

router.get('/me', authMiddleware, authController.getUser);

module.exports = router;