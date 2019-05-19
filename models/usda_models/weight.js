const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weight = new Schema({
    NDB_No: { type: String, Required: true },
    Seq: {type: String, required: true},
    Amount: {type: Number, required: true},
    Msre_Desc: {type: String, required: true},
    Gm_Wgt: {type: Number, required: true},
    Num_Data_Pts: Number,
    Std_Dev: Number
}, { collection: 'weight' });

module.exports = mongoose.model('weight', weight);