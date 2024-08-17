const { createOrder, getOrdersByUserId } = require('../models/Order');
const { addOrderItem, getOrderItemsByOrderId } = require('../models/OrderItem');

exports.createOrder = async (req, res) => {
    try {
        const { userId, totalPrice, items } = req.body;
        const orderId = await createOrder(userId, totalPrice);
        
        for (const item of items) {
            await addOrderItem(orderId, item.productId, item.quantity, item.price);
        }
        
        res.status(201).json({ id: orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await getOrdersByUserId(userId);
        
        for (const order of orders) {
            order.items = await getOrderItemsByOrderId(order.id);
        }
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
