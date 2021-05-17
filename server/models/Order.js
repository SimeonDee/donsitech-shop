const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
        username: { type: String, required: true, minlength: 3 },
        products: [
            { 
                name: {type: String, required: true, default: "Hp Laserjet 360 Printer" },
                qty_ordered: { type: Number, required: true, default: 1 },
            }
        ],
        shipping_cost: { type: String, default: 0.0 },
        tax: { type: Number, default: 0.0 },
        total_cost: { type: Number, required: true, default: 0.0 },
        order_date: { type: Date, required: true, default: Date.now },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('orders', orderSchema);