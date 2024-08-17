const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/', (req, res) => {
  Review.getAll()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get reviews by product ID
router.get('/product/:productId', (req, res) => {
  const productId = req.params.productId;
  Review.getByProductId(productId)
    .then(reviews => res.json(reviews))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get a specific review by ID
router.get('/:id', (req, res) => {
  const reviewId = req.params.id;
  Review.getById(reviewId)
    .then(review => {
      if (review) {
        res.json(review);
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Add a new review
router.post('/', (req, res) => {
  const { productId, userId, rating, comment } = req.body;
  if (!productId || !userId || !rating) {
    return res.status(400).json({ message: 'Product ID, User ID, and rating are required' });
  }
  Review.add({ productId, userId, rating, comment })
    .then(newReview => res.status(201).json(newReview))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a review
router.put('/:id', (req, res) => {
  const reviewId = req.params.id;
  const { rating, comment } = req.body;
  Review.update(reviewId, { rating, comment })
    .then(updatedReview => {
      if (updatedReview) {
        res.json(updatedReview);
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a review
router.delete('/:id', (req, res) => {
  const reviewId = req.params.id;
  Review.remove(reviewId)
    .then(deleted => {
      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
