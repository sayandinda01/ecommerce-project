const { getAllProducts, createProduct } = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId, imageUrl } = req.body;
        const productId = await createProduct(name, description, price, stock, categoryId, imageUrl);
        res.status(201).json({ id: productId, name, description, price, stock, categoryId, imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
