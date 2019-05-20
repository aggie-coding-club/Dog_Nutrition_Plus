const mongoose = require('mongoose');

var Cart = new mongoose.Schema({
    food: {
        NDB_No: String,
        Amount: Number
    },
    userId: String
});

module.exports = mongoose.model('Cart', Cart);