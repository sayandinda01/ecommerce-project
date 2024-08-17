const db = require('../config/db');

const OrderItem = {
  // Get all order items
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM order_items', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Get order items by Order ID
  getByOrderId: (orderId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM order_items WHERE order_id = ?', [orderId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Get order item by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM order_items WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]); // Assuming IDs are unique, so results[0] is the single order item
      });
    });
  },

  // Create a new order item
  create: (orderItemData) => {
    return new Promise((resolve, reject) => {
      const { order_id, product_id, quantity, price } = orderItemData;
      db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [order_id, product_id, quantity, price],
        (err, results) => {
          if (err) reject(err);
          else resolve(results.insertId); // Return the ID of the new order item
        }
      );
    });
  },

  // Update an order item by ID
  update: (id, orderItemData) => {
    return new Promise((resolve, reject) => {
      const { order_id, product_id, quantity, price } = orderItemData;
      db.query(
        'UPDATE order_items SET order_id = ?, product_id = ?, quantity = ?, price = ? WHERE id = ?',
        [order_id, product_id, quantity, price, id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results.affectedRows); // Return number of affected rows
        }
      );
    });
  },

  // Delete an order item by ID
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM order_items WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows); // Return number of affected rows
      });
    });
  },
  
  // Delete all order items by Order ID
  deleteByOrderId: (orderId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM order_items WHERE order_id = ?', [orderId], (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows); // Return number of affected rows
      });
    });
  }
};

module.exports = OrderItem;
