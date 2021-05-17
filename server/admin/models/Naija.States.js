const mongoose = require('mongoose');

const ngstateSchema = new mongoose.Schema({
        name: { type: String, unique: true, required: true, minlength: 3 },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('states', ngstateSchema);