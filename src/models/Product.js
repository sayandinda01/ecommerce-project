// models/Product.js

const db = require('../config/db');

// Get all products with optional search query
const getAll = (query) => {
  const sql = 'SELECT * FROM products WHERE name LIKE ?';
  return db.query(sql, [`%${query}%`]);
};

// Get a specific product by ID
const getById = (id) => {
  return db.query('SELECT * FROM products WHERE id = ?', [id]).then(results => results[0]);
};

// Add a new product
const add = (product) => {
  const { name, description, price, categoryId, imageUrl } = product;
  return db.query('INSERT INTO products (name, description, price, categoryId, imageUrl) VALUES (?, ?, ?, ?, ?)', [name, description, price, categoryId, imageUrl])
    .then(result => ({ id: result.insertId, ...product }));
};

// Update a product
const update = (id, product) => {
  const { name, description, price, categoryId, imageUrl } = product;
  return db.query('UPDATE products SET name = ?, description = ?, price = ?, categoryId = ?, imageUrl = ? WHERE id = ?', [name, description, price, categoryId, imageUrl, id])
    .then(result => (result.affectedRows ? product : null));
};

// Delete a product
const remove = (id) => {
  return db.query('DELETE FROM products WHERE id = ?', [id])
    .then(result => result.affectedRows > 0);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};
