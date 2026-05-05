const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth'); // I'll create this next

// @route   GET /api/menu
// @desc    Get all menu items
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find().sort({ date: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/menu
// @desc    Add a new menu item (Admin only)
router.post('/', auth, async (req, res) => {
    // Check if user is admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    try {
        const newItem = new MenuItem(req.body);
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   DELETE /api/menu/:id
// @desc    Delete a menu item (Admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        
        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
