const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deriv_cd = new Schema({
    Deriv_Cd: { type: String, Required: true},
    Deriv_Desc: { type: String, Required: true}
}, { collection: 'deriv_cd' });

module.exports = mongoose.model('deriv_cd', deriv_cd);