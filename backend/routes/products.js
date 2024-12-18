// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../middleware/imageUpload');
const auth = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('storeId');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a product
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = `/uploads/products/${req.file.filename}`;
    
    const product = new Product({
      storeId: req.body.storeId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageUrl: imageUrl,
      stock: req.body.stock
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get products by store
router.get('/store/:storeId', async (req, res) => {
  try {
    const products = await Product.find({ storeId: req.params.storeId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;