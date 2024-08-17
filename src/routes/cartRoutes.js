const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem'); // Ensure this is the correct path

// Get all items in the cart for a specific user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  CartItem.getAll(userId)
    .then(cartItems => res.json(cartItems))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Add a new item to the cart
router.post('/', (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'User ID, product ID, and quantity are required' });
  }
  CartItem.create({ userId, productId, quantity }) // Use 'create' method from CartItem
    .then(newCartItem => res.status(201).json(newCartItem))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update the quantity of an item in the cart
router.put('/:id', (req, res) => {
  const id = req.params.id; // Cart item ID
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(400).json({ message: 'Quantity is required' });
  }
  CartItem.update(id, { quantity }) // Use 'update' method from CartItem
    .then(updatedItem => {
      if (updatedItem) {
        res.json(updatedItem);
      } else {
        res.status(404).json({ message: 'Cart item not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Remove an item from the cart
router.delete('/:id', (req, res) => {
  const id = req.params.id; // Cart item ID
  CartItem.delete(id) // Use 'delete' method from CartItem
    .then(deleted => {
      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: 'Cart item not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
