const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const footnote = new Schema({
    NDB_No: { type: String, Required: true },
    Footnt_No: {type: String, required: true},
    Footnt_Typ: {type: String, required: true},
    Nutr_No: String,
    Footnt_Txt: String
}, { collection: 'footnote' });

module.exports = mongoose.model('footnote', footnote);