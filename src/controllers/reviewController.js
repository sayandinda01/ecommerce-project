const { addReview, getReviewsByProductId } = require('../models/Review');

exports.addReview = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;
        const reviewId = await addReview(userId, productId, rating, comment);
        res.status(201).json({ id: reviewId, userId, productId, rating, comment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await getReviewsByProductId(productId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
