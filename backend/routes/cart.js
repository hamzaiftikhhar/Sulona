// routes/cart.js (Backend)
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id })
      .populate('items.productId');
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    // Transform the data to match the frontend structure
    const transformedItems = cart.items.map(item => ({
      _id: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      // Add other product fields as needed
    }));
    
    res.json(transformedItems);
  } catch (error) {
    console.error('Cart fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// Sync cart
router.post('/sync', auth, async (req, res) => {
  try {
    const { items } = req.body;
    
    const transformedItems = items.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }));

    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { 
        items: transformedItems,
        lastUpdated: Date.now()
      },
      { new: true, upsert: true }
    );

    res.json(items);
  } catch (error) {
    console.error('Cart sync error:', error);
    res.status(500).json({ message: 'Failed to sync cart' });
  }
}); 
module.exports = router;
