const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Search products by name
router.get('/name/:query', (req, res) => {
  const query = req.params.query;
  Product.searchByName(query)
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Search products by category
router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  Product.searchByCategory(category)
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Search products with price range
router.get('/price', (req, res) => {
  const { min, max } = req.query;
  if (!min || !max) {
    return res.status(400).json({ error: 'Min and max price are required' });
  }
  Product.searchByPriceRange(parseFloat(min), parseFloat(max))
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
