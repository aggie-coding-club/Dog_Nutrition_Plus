const router = require('express').Router();
const passport = require('passport');

// var router = express.Router();

// Login landing page
router.get('/login', function(req, res){
    res.render('./auth/login', {user: req.user});
});

// Logout Landing page
router.get('/logout', function (req, res) {
    // We need to handle this with passport
    req.logout();
    res.redirect('/');
});

// Google Auth page
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), function(req, res){
    res.redirect('/profile');
});

module.exports = router;