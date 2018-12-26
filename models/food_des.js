const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const food_des = new Schema({
    NDB_No: { type: String, Required: 'There must be an id PRIMARY KEY' },
    FdGrp_Cd: { type: String, Required: 'There must be a name for each nutrient.' },
    Long_Desc: { type: String, Required: 'Missing Long Description' },
    Shrt_Desc: { type: String, Required: 'Missing short description' },
    ComName: { type: String },
    ManufacName: { type: String },
    Survey: { type: String },
    Ref_desc: { type: String },
    Refuse: { type: Number },
    SciName: { type: String },
    N_Factor: { type: Number },
    Pro_Factor: { type: Number },
    Fat_Factor: { type: Number },
    CHO_Factor: { type: Number }
}, { collection: 'food_des' });

module.exports = mongoose.model('food_des', food_des);