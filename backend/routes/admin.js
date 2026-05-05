const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// @route   GET /api/admin/stats
// @desc    Get dashboard stats (Admin only)
router.get('/stats', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    try {
        const totalOrders = await Order.countDocuments();
        const orders = await Order.find();
        const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);
        
        res.json({
            totalOrders,
            totalRevenue: totalRevenue.toFixed(2)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/admin/orders
// @desc    Get all orders (Admin only)
router.get('/orders', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only.' });

    try {
        const orders = await Order.find().sort({ date: -1 }).populate('user', 'name email');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   PUT /api/admin/orders/:id
// @desc    Update order status
router.put('/orders/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only.' });

    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        
        // Emit real-time update
        req.io.emit('orderStatusUpdated', {
            orderId: order._id,
            status: order.status
        });

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
