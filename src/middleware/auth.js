const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to protect routes
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user data to the request object
    next(); // Move to the next middleware/route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Move to the next middleware/route handler
  } else {
    return res.status(403).json({ message: 'Access Denied. Admins only.' });
  }
};

module.exports = { auth, isAdmin };
