const router = require('express').Router();
const mongoose = require('mongoose');
const Cart = require('../models/cart-model');
const Diet = require('../models/diet-model');

const userCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('auth/login');
    } else {
        next();
    }
}

router.get('/create', userCheck, function(req, res){
    res.render('../views/diet/dietcreation');
});



module.exports = router;