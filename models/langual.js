const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const langual = new Schema({
    NDB_No: { type: String, Required: 'There must be an id PRIMARY KEY' },
    Factor_Code: String
}, { collection: 'langual' });

module.exports = mongoose.model('langual', langual);