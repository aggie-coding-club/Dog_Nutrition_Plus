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

// Create page
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

//AJAX ROUTES

router.get('/getFoodIds', userCheck, function(req, res){
    Cart.find({ userId: req.user.id }, function(err, results){
        if(err){
            throw err;
        } else if(results.length < 1){
            console.log("There aren't any items in the cart");
        } else{
            let retval = [];
            for(let i = 0; i < results.length; i++){
                retval.push(results[i].id);
            }
            res.send(retval);
        }
    })
})

router.post('/update', userCheck, function (req, res) {
    let cartIds = req.body.cartIds;
    let amounts = req.body.amounts;
    console.log(amounts[0]);
    for (let i = 0; i < cartIds.length; i++) {
        Cart.updateOne({ _id: cartIds[i] }, { 'food.Amount': amounts[i] }, function(err, numUpdates){
            // console.log(numUpdates);
        });

    }
});

module.exports = router;