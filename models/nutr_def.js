const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutr_def = new Schema({
    Nutr_No: {type: String, required: true}, //Primary Key
    Units: {type: String, required: true},
    Tagname: String,
    NutrDesc: { type: String, required: true},
    Num_Dec: {type: String, required: true},
    SR_Order: Number
}, { collection: 'nutr_def' });

module.exports = mongoose.model('nutr_def', nutr_def);