const mongoose = require('mongoose');

var Diet = new mongoose.Schema({
    Foods: [{
        NDB_No: Number,
        Amount: Number
    }],
    userId: String,
    dietName: String,
    dogIds: [String]
});

module.exports = mongoose.model('Diet', Diet);