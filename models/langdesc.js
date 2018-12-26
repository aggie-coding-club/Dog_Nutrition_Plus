const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const langdesc = new Schema({
    Factor_Code: { type: String, required: true}, //Primary Key
    Description: { type: String, required: true}
}, { collection: 'langdesc' });

module.exports = mongoose.model('langdesc', langdesc);