var cn = require("../../db");

const config = require("../../config");

var exports = {
  getNutrInfo: function(foodNum) {
    cn.query(`CALL get_NutDataDef(${foodNum})`, (err, results) => {
      if(err){
        return console.log(err);
      }
      console.log(results);
    })
  },
  
  getNutrNumbers: function(callback){
    cn.query(`SELECT Nutr_No FROM nutr_def`, (err, results) => {
      if(err){
        return console.log(err);
      }
      // console.log(results)
      callback(results);
    })
  },

  nutExists: function(NDB_No, Nutr_No, callback){
    cn.query(`CALL get_nutExists(${NDB_No},${Nutr_No})`, (err, results) => {
      if(err){
        return console.log(err);
      } else if(results){
        callback(results)
      } else{
        callback(null);
      }
    })
  }
}

module.exports = exports;
