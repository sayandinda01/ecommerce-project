const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', (req, res) => {
  User.getAll()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get a user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.getById(userId)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Create a new user
router.post('/', (req, res) => {
  const newUser = req.body;
  User.create(newUser)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Update a user
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  User.update(userId, updatedUser)
    .then(result => {
      if (result) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  User.delete(userId)
    .then(result => {
      if (result) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
