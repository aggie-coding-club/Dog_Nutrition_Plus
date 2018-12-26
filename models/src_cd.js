const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const src_cd = new Schema({
    Src_Cd: {type: String, required: true}, //Primary Key
    SrcCd_Desc: {type: String, required: true}
}, { collection: 'src_cd' });

module.exports = mongoose.model('src_cd', src_cd);