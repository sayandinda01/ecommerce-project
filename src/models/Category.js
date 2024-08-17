// models/Category.js

const db = require('../config/db');

// Get all categories
const getAll = () => {
  return db.query('SELECT * FROM categories');
};

// Get a specific category by ID
const getById = (id) => {
  return db.query('SELECT * FROM categories WHERE id = ?', [id]).then(results => results[0]);
};

// Create a new category
const create = (category) => {
  const { name, description } = category;
  return db.query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description])
    .then(result => ({ id: result.insertId, ...category }));
};

// Update a category
const update = (id, category) => {
  const { name, description } = category;
  return db.query('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id])
    .then(result => (result.affectedRows ? { id, ...category } : null));
};

// Delete a category
const remove = (id) => {
  return db.query('DELETE FROM categories WHERE id = ?', [id])
    .then(result => result.affectedRows > 0);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};