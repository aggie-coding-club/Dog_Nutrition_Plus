const mongoose = require('mongoose');
const router = require('express').Router();
const Cart = require('../models/cart-model');
const db = require('../db');

const userCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('auth/login');
    } else{
        next();
    }
}

function namesCallback(results, callback){
    // console.log('Number of results ' + results.length)
    for (let i = 0; i < results.length; i++) {
        db.query("SELECT Long_Desc FROM food_des WHERE NDB_No = '" + results[i].food.NDB_No + "'", (err, name) => {
            if (err) {
                console.log('Error when looking for names in cart route' + err);
            } else if (i === results.length - 1) {
                callback(true, name[0].Long_Desc);
            } else {
                callback(false, name[0].Long_Desc);
            }
            
        })
    }
}

router.get('/', userCheck, function(req, res){
    Cart.find({ userId: req.user.id }, function(err, results){
        if(err && results.length !== 0){
            console.log('Error when trying to use the cart route: ' + err);
        } else if(results.length === 0){
            res.render('../views/profile/cart', { foodItems: null, foodNames: null});
        } else{
            let names = [];
            namesCallback(results, function(end, name){
                names.push(name);
                if(end){
                    res.render('../views/profile/cart', { foodItems: results, foodNames: names });
                }
            })
        }
    })
});

// Add an item to cart
router.get('/add/:id', userCheck, function(req, res){
    new Cart({
        food: {
            NDB_No: req.params.id,
            Amount: 0
        },
        userId: req.user.id
    }).save().then((obj) => {
        console.log('New cart object saved: ' + obj);
        res.redirect('/datasearch');
    });
})

// Delete an item from cart
router.get('/delete/:id', userCheck, function(req, res){
    console.log("Deleteing cart item with id: " + req.params.id);
    Cart.deleteOne({ _id: req.params.id }, function(err) {
        if(err){
            console.log("There is an error deleting the object in cart/delete/ : " + err);
        }
        res.redirect('/cart');
    });
});

router.get('/createDiet', userCheck, function(req, res){
    Cart.find({ userId: req.user.id }, function(err, foods){
        if(foods.length === 0){
            res.redirect('/cart');
        } else if(err){
            console.log("Error when trying to create diet: " + err);
        } else{
            
        }
    })
})


module.exports = router;