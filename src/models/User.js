const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  // Get all users
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Get a user by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]); // Assuming IDs are unique, so results[0] is the single user
      });
    });
  },

  // Create a new user
  create: (userData) => {
    return new Promise((resolve, reject) => {
      const { username, email, password, isAdmin } = userData;
      // Hash the password before storing it
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) reject(err);
        db.query(
          'INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)',
          [username, email, hashedPassword, isAdmin || 0], // Default isAdmin to 0 (false)
          (err, results) => {
            if (err) reject(err);
            else resolve(results.insertId); // Return the ID of the new user
          }
        );
      });
    });
  },

  // Update a user by ID
  update: (id, userData) => {
    return new Promise((resolve, reject) => {
      const { username, email, password, isAdmin } = userData;
      // Hash the password before updating it
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) reject(err);
        db.query(
          'UPDATE users SET username = ?, email = ?, password = ?, isAdmin = ? WHERE id = ?',
          [username, email, hashedPassword, isAdmin, id],
          (err, results) => {
            if (err) reject(err);
            else resolve(results.affectedRows); // Return number of affected rows
          }
        );
      });
    });
  },

  // Delete a user by ID
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows); // Return number of affected rows
      });
    });
  },

  // Find a user by email (useful for login/authentication)
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]); // Assuming email is unique, so results[0] is the single user
      });
    });
  },
};

module.exports = User;
