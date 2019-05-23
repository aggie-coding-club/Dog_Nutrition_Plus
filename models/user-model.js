const mongoose = require('mongoose');

var User = new mongoose.Schema({
    name: String,
    googleId: String,
    picture: String,
    diets: [String]
});

module.exports = mongoose.model('User', User);
