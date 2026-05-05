const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // 'pending', 'preparing', 'completed'
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
