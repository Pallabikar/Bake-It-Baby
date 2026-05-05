const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String }, // Optional image URL
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
