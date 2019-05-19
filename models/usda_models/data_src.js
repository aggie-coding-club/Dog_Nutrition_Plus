const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data_src = new Schema({
    DataSrc_ID: { type: String, Required: true },
    Authors: String,
    Title: { type: String, Required: true },
    Year: String,
    Journal: String,
    Vol_City: String,
    Issue_State: String,
    Start_Page: String,
    End_Page: String
}, { collection: 'data_src' });

module.exports = mongoose.model('data_src', data_src);