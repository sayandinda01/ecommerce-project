const { getAllCategories, createCategory } = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const categoryId = await createCategory(name, description);
        res.status(201).json({ id: categoryId, name, description });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
