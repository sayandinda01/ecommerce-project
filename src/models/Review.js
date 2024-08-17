// models/Review.js

const db = require('../config/db');

// Get all reviews
const getAll = () => {
  return db.query('SELECT * FROM reviews');
};

// Get reviews by product ID
const getByProductId = (productId) => {
  return db.query('SELECT * FROM reviews WHERE productId = ?', [productId]);
};

// Get review by ID
const getById = (id) => {
  return db.query('SELECT * FROM reviews WHERE id = ?', [id]).then(results => results[0]);
};

// Add a new review
const add = (review) => {
  const { productId, userId, rating, comment } = review;
  return db.query('INSERT INTO reviews (productId, userId, rating, comment) VALUES (?, ?, ?, ?)', [productId, userId, rating, comment])
    .then(result => ({ id: result.insertId, ...review }));
};

// Update a review
const update = (id, review) => {
  const { rating, comment } = review;
  return db.query('UPDATE reviews SET rating = ?, comment = ? WHERE id = ?', [rating, comment, id])
    .then(result => (result.affectedRows ? review : null));
};

// Delete a review
const remove = (id) => {
  return db.query('DELETE FROM reviews WHERE id = ?', [id])
    .then(result => result.affectedRows > 0);
};

module.exports = {
  getAll,
  getByProductId,
  getById,
  add,
  update,
  remove
};
