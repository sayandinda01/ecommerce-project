// models/Cart.js

const db = require('../config/db');

// Get all items in the cart for a specific user
const getAll = (userId) => {
  return db.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
};

// Add a new item to the cart
const addItem = (userId, productId, quantity) => {
  return db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity])
    .then(result => ({ id: result.insertId, userId, productId, quantity }));
};

// Update the quantity of an item in the cart
const updateItem = (userId, productId, quantity) => {
  return db.query('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', [quantity, userId, productId])
    .then(result => (result.affectedRows ? { userId, productId, quantity } : null));
};

// Remove an item from the cart
const removeItem = (userId, productId) => {
  return db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId])
    .then(result => result.affectedRows > 0);
};

module.exports = {
  getAll,
  addItem,
  updateItem,
  removeItem
};
