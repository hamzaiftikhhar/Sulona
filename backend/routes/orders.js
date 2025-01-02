// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Log incoming requests for debugging
router.use((req, res, next) => {
  console.log('Orders Route - Incoming Request:', {
    method: req.method,
    path: req.path,
    body: req.body
  });
  next();
});

router.post('/', async (req, res) => {
  try {
    console.log('Creating new order:', req.body);
    const { formData, cart, subtotal, shipping, total } = req.body;
    
    const order = new Order({
      email: formData.email,
      shippingDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city
      },
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal,
      shipping,
      total
    });

    const savedOrder = await order.save();
    console.log('Order saved successfully:', savedOrder._id);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: savedOrder._id
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});

module.exports = router;