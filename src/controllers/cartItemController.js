const CartItem = require('../models/CartItem');

// Get all cart items for a user
exports.getCartItems = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a URL parameter
        const cartItems = await CartItem.getAll(userId);
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new cart item
exports.addCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const newCartItem = await CartItem.create({ userId, productId, quantity });
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a cart item
exports.removeCartItem = async (req, res) => {
    try {
        const { id } = req.params; // Assuming cart item ID is passed as a URL parameter
        const success = await CartItem.delete(id);
        if (success) {
            res.json({ message: 'Item removed from cart' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a cart item
exports.updateCartItem = async (req, res) => {
    try {
        const { id } = req.params; // Assuming cart item ID is passed as a URL parameter
        const { quantity } = req.body;
        const updatedCartItem = await CartItem.update(id, { quantity });
        if (updatedCartItem) {
            res.json(updatedCartItem);
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
