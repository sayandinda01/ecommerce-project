const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', (req, res) => {
  Order.getAll()
    .then(orders => res.json(orders))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get a specific order by ID
router.get('/:id', (req, res) => {
  const orderId = req.params.id;
  Order.getById(orderId)
    .then(order => {
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Create a new order
router.post('/', (req, res) => {
  const { userId, products, totalAmount } = req.body;
  if (!userId || !products || !totalAmount) {
    return res.status(400).json({ message: 'User ID, products, and total amount are required' });
  }
  Order.create({ userId, products, totalAmount })
    .then(newOrder => res.status(201).json(newOrder))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update an order (e.g., change status)
router.put('/:id', (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }
  Order.updateStatus(orderId, status)
    .then(updatedOrder => {
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete an order
router.delete('/:id', (req, res) => {
  const orderId = req.params.id;
  Order.remove(orderId)
    .then(deleted => {
      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
