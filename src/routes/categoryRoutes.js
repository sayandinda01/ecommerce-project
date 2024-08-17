const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', (req, res) => {
  Category.getAll()
    .then(categories => res.json(categories))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get a specific category by ID
router.get('/:id', (req, res) => {
  const categoryId = req.params.id;
  Category.getById(categoryId)
    .then(category => {
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Create a new category
router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }
  Category.create({ name, description })
    .then(newCategory => res.status(201).json(newCategory))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a category
router.put('/:id', (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;
  Category.update(categoryId, { name, description })
    .then(updatedCategory => {
      if (updatedCategory) {
        res.json(updatedCategory);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a category
router.delete('/:id', (req, res) => {
  const categoryId = req.params.id;
  Category.remove(categoryId)
    .then(deleted => {
      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
