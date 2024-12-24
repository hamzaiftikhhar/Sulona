const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/sync', auth, async (req, res) => {
  try {
    const { items } = req.body;
    let cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items },
      { new: true, upsert: true }
    );
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});