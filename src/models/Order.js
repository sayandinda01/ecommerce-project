// models/Order.js

const db = require('../config/db');

// Get all orders
const getAll = () => {
  return db.query('SELECT * FROM orders');
};

// Get a specific order by ID
const getById = (id) => {
  return db.query('SELECT * FROM orders WHERE id = ?', [id]).then(results => results[0]);
};

// Create a new order
const create = (order) => {
  const { userId, products, totalAmount } = order;
  return db.query('INSERT INTO orders (userId, products, totalAmount) VALUES (?, ?, ?)', [userId, JSON.stringify(products), totalAmount])
    .then(result => ({ id: result.insertId, ...order }));
};

// Update an order's status
const updateStatus = (id, status) => {
  return db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id])
    .then(result => (result.affectedRows ? { id, status } : null));
};

// Delete an order
const remove = (id) => {
  return db.query('DELETE FROM orders WHERE id = ?', [id])
    .then(result => result.affectedRows > 0);
};

module.exports = {
  getAll,
  getById,
  create,
  updateStatus,
  remove
};
