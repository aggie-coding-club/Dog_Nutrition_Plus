const router = require('express').Router();

// Used to check if the user is logged in
const authCheck = (req, res, next) => {
    if(!req.user){
        // Executes if the user is not logged in
        res.redirect('/auth/login');
    } else {
        // If the user is logged in
        next();
    }
};

router.get('/', authCheck, function(req, res){
    res.render('../views/profile/profile', { user: req.user });
});

module.exports = router;