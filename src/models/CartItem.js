// models/CartItem.js

const db = require('../config/db');

const CartItem = {
  // Get all cart items
  getAll: (userId) => {
    return db.query('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
  },

  // Get a specific cart item by ID
  getById: (id) => {
    return db.query('SELECT * FROM cart_items WHERE id = ?', [id]).then(results => results[0]);
  },

  // Add a new cart item
  create: (cartItem) => {
    const { userId, productId, quantity } = cartItem;
    return db.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity])
      .then(result => ({ id: result.insertId, ...cartItem }));
  },

  // Update a cart item
  update: (id, cartItem) => {
    const { quantity } = cartItem;
    return db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id])
      .then(result => (result.affectedRows ? cartItem : null));
  },

  // Delete a cart item
  delete: (id) => {
    return db.query('DELETE FROM cart_items WHERE id = ?', [id])
      .then(result => result.affectedRows > 0);
  }
};

module.exports = CartItem;
