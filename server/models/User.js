const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        username: { type: String, required: true, minlength: 3 },
        password: { type: String, required: true },
        state: { type: String, required: true },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);