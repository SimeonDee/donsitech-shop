const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
        username:  { type: String, required: true },
        email_address: { type: String, required: true },   
        order_id: { type: mongoose.SchemaTypes.ObjectId, required: true, minlength: 3 },
        amount_paid: { type: Number, required: true, default: 0.0 },
        channel: { type: String, required: true }, 
        payment_date: { type: Date, required: true, default: Date.now },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('payments', paymentSchema);