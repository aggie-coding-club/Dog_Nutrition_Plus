const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data_src_link = new Schema({
    NDB_No: { type: String, Required: 'There must be an id PRIMARY KEY' },
    Nutr_No: { type: String, Required: true },
    DataSrc_ID: { type: String, Required: true }
}, { collection: 'data_src_link' });

module.exports = mongoose.model('data_src_link', data_src_link);