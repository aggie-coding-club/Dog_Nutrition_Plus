var db = require('./db.js');

module.exports = {
    dietLanding: function(req, res){
        res.render('dietcreation.ejs');
    }
}