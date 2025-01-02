// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const { createOrder } = require('../middleware/orderController');
const auth = require('../middleware/auth');

// Create order route - make auth optional using custom middleware
const optionalAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      // Your existing auth logic here
      // If successful, it will set req.user
    }
    next();
  } catch (error) {
    next(); // Continue without auth
  }
};

router.post('/', optionalAuth, createOrder);

module.exports = router;