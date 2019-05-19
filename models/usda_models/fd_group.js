const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fd_group = new Schema({
    FdGrp_Cd: {type: String, required: true},
    FdGrp_Desc: String
}, { collection: 'fd_group' });

module.exports = mongoose.model('fd_group', fd_group);