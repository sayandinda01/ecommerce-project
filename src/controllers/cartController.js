import { createCart, getCartByUserId } from '../models/Cart.js';
import { addCartItem, getCartItemsByCartId } from '../models/CartItem.js';

export const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await getCartByUserId(userId);
        const items = await getCartItemsByCartId(cart.id);
        res.json({ cart, items });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addCartItem = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity, price } = req.body;
        const cartItemId = await addCartItem(cartId, productId, quantity, price);
        res.status(201).json({ id: cartItemId, cartId, productId, quantity, price });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
