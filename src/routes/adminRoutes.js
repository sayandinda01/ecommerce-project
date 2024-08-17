const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');

// Controllers
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');

// Example of a protected route
router.get('/protected', auth, (req, res) => {
  res.send(`Hello, ${req.user.username}! You are authenticated.`);
});

// Example of an admin-only route
router.get('/admin', auth, isAdmin, (req, res) => {
  res.send('Welcome, Admin!');
});

// Admin route to get all products
router.get('/products', auth, isAdmin, (req, res) => {
  Product.getAll()
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Admin route to add a new product
router.post('/products', auth, isAdmin, (req, res) => {
  const { name, description, price, categoryId } = req.body;
  if (!name || !price || !categoryId) {
    return res.status(400).json({ message: 'Name, price, and category ID are required' });
  }
  Product.create({ name, description, price, categoryId })
    .then(product => res.status(201).json(product))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Admin route to update a product
router.put('/products/:id', auth, isAdmin, (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;
  Product.update(id, { name, description, price, categoryId })
    .then(updated => {
      if (updated) {
        res.json({ message: 'Product updated successfully' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Admin route to delete a product
router.delete('/products/:id', auth, isAdmin, (req, res) => {
  const { id } = req.params;
  Product.delete(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Admin route to get all categories
router.get('/categories', auth, isAdmin, (req, res) => {
  Category.getAll()
    .then(categories => res.json(categories))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Admin route to add a new category
router.post('/categories', auth, isAdmin, (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }
  Category.create({ name })
    .then(category => res.status(201).json(category))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Admin route to update a category
router.put('/categories/:id', auth, isAdmin, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  Category.update(id, { name })
    .then(updated => {
      if (updated) {
        res.json({ message: 'Category updated successfully' });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Admin route to delete a category
router.delete('/categories/:id', auth, isAdmin, (req, res) => {
  const { id } = req.params;
  Category.delete(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Admin route to get all users
router.get('/users', auth, isAdmin, (req, res) => {
  User.getAll()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Admin route to update a user (e.g., change user roles)
router.put('/users/:id', auth, isAdmin, (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;
  User.update(id, { username, role })
    .then(updated => {
      if (updated) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
