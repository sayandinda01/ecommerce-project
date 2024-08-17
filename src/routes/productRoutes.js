const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with optional search query
router.get('/', (req, res) => {
  const query = req.query.query || '';
  Product.getAll(query)
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get a specific product by ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  Product.getById(productId)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Add a new product
router.post('/', (req, res) => {
  const { name, description, price, categoryId, imageUrl } = req.body;
  if (!name || !description || !price || !categoryId) {
    return res.status(400).json({ message: 'Name, description, price, and category ID are required' });
  }
  Product.add({ name, description, price, categoryId, imageUrl })
    .then(newProduct => res.status(201).json(newProduct))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a product
router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const { name, description, price, categoryId, imageUrl } = req.body;
  Product.update(productId, { name, description, price, categoryId, imageUrl })
    .then(updatedProduct => {
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a product
router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  Product.remove(productId)
    .then(deleted => {
      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;