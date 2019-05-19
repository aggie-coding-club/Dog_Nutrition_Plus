const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nut_data = new Schema({
    NDB_No: { type: String, Required: 'There must be an id' },
    Nutr_No: { type: String, Required: true},
    Nutr_Val: { type: String, Required: true},
    Num_Data_Pts: { type: Number, Required: true},
    Std_Error: Number,
    Src_Cd: { type: String, Required: true},
    Deriv_Cd: { type: String, Required: true},
    Ref_NDB_No: String,
    Add_Nutr_Mark: String,
    Num_Studies: Number,
    Min: Number,
    Max: Number,
    DF: Number,
    Low_EB: Number,
    Up_EB: Number,
    Stat_cmt: String,
    AddMod_Date: String,
    CC: String
}, { collection: 'nut_data' });

module.exports = mongoose.model('nut_data', nut_data);