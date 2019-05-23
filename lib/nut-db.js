// A set of functions designed to help develop (util)
const mongoose = require('mongoose');
const db = require('../db');

module.exports = {
    getFoodDes: function(NDB_No, callback){
        let limit;
        let arr = [];
        if(Array.isArray(NDB_No)){
            limit = NDB_No.length;
            arr = NDB_No;
        } else{
            limit = 1;
            arr.push(NDB_No);
        }

        for(let i = 0; i < limit; i++){
            db.query("SELECT * FROM food_des WHERE NDB_No = '" + arr[i] + "'", function (err, result) {
                if (err) {
                    console.log("There has been an error: " + err);
                } else if (result.length === 0) {
                    console.log("There are no results");
                }
                if(i === limit - 1){
                    callback(true, result[0]);
                } else{
                    callback(false, result[0]);
                }
            });
        }
    },

    getFootnote: function(NDB_No, callback){
        db.query("SELECT * FROM footnote WHERE NDB_No = '" + NDB_No + "'", function (err, result) {
            if(err){
                console.log("There has been an error: " + err);
            } else if(result.length === 0){
                console.log("There are no results");
            }
            return callback(result[0]);
        })
    },

    getNutrients: function(NDB_No, callback){
        db.query("SELECT * FROM nut_data WHERE NDB_No = '" + NDB_No + "'", function (err, results) {
            if(err){
                console.log("There has been an error: " + err);
            } else if(results.length === 0){
                console.log("There are no results");
            }
            for(var i = 0; i < results.length; i++){
                db.query("SELECT * FROM nutr_def WHERE NDB_No = '" + results[i].Nutr_No + "'", function(err, nutrDef){
                    if(err){
                        console.log("There has been an error: " + err);
                    } else if (nutrDef.length === 0){
                        console.log("There are no results");
                    }
                    results[i].nutrDef = nutrDef;
                    if(i === results.length - 1){
                        return callback(results);
                    }
                })
            }
        })
    },

    getWeightData: function(NDB_No, callback){
        db.query("SELECT * FROM weight WHERE NDB_No = '" + NDB_No + "'", function(err, result){
            if(err){
                console.log("There has been an error: " + err);
            } else if(result.length === 0){
                console.log("There are no results");
            }
            return callback(result[0]);
        });
    },

    getLangual: function (NDB_No, callback){
        db.query("SELECT * FROM langual WHERE NDB_No = '" + NDB_No + "'", function (err, result) {
            if(err){
                console.log("There has been an error: " + err);
            } else if(result.length === 0){
                console.log("There are no results");
            }
            return callback(result[0]);
        });
    },

    getNutrientDef: function(Nutr_No, callback){
        db.query("SELECT * FROM nutr_def WHERE Nutr_No = '" + Nutr_No + "'", function(err, result){
            if(err){
                console.log("There has been an error: " + err);
            } else if(result.length === 0){
                console.log("There are no results");
            }
            return callback(result[0])
        })
    },

    getLangualDesc: function(NDB_No, callback){
        getLangual(NDB_No, function (langualData) {
            db.query("SELECT * FROM langdesc WHERE Factor_Code = '" + langualData.Factor_Code + "'", function (err, result) {
                if(err){
                    console.log("There has been an error: " + err);
                } else if(result.length === 0){
                    console.log("There are no results");
                }
                return callback(result[0]);
            });
        });
    }
}