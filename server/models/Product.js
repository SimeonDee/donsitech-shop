const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name: { type: String, required: true, minlength: 3 },
        category: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true, default: 0.0 },
        available_qty: { type: Number, required: true, default: 0 },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('products', productSchema);