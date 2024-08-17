const mysql = require('mysql');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Use the port from .env, or default to 3306
});

// To perform a query
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        console.error('Database query error:', error.message); // Enhanced logging
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Closing the pool (useful for graceful shutdown)
const closePool = () => {
  pool.end(err => {
    if (err) {
      console.error('Error closing the database connection pool:', err.message);
    } else {
      console.log('Database connection pool closed.');
    }
  });
};

module.exports = {
  query,
  closePool
};