const router = require('express').Router();
const mongoose = require('mongoose');
const Cart = require('../models/cart-model');
const Diet = require('../models/diet-model');
const nutUtil = require('../lib/nut-db');

const userCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}

router.get('/create', userCheck, function (req, res) {
    Cart.find({ userId: req.user.id }, function (err, foods) {
        if (err) {
            console.log("There was an error in diet/create: " + err);
        } else {
            let nums = [];
            let namesRet = [];
            for(var i = 0; i < foods.length; i++){
                nums.push(foods[i].food.NDB_No);
            }
            nutUtil.getFoodDes(nums, function (finish, food_des) {
                namesRet.push(food_des.Long_Desc);
                if(finish){
                    console.log(namesRet);
                    res.render('../views/diet/dietcreation', {
                        foodNames: namesRet,
                        foodObjects: foods,
                        user: req.user
                    });
                }
            });
        }
    });
});

module.exports = router;