const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Place a new order
router.post('/', auth, async (req, res) => {
    try {
        const { items, total } = req.body;
        const newOrder = new Order({
            user: req.user.id,
            items,
            total
        });
        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/orders/myorders
// @desc    Get user order history
router.get('/myorders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
