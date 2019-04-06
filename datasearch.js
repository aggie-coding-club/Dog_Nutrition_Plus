var express = require('express');

var data_src_link = require('./models/data_src_link.js'),
  data_src = require('./models/data_src.js'),
  deriv_cd = require('./models/deriv_cd.js'),
  fd_group = require('./models/fd_group.js'),
  food_des = require('./models/food_des.js'),
  footnote = require('./models/footnote.js'),
  langdesc = require('./models/langdesc.js'),
  langual = require('./models/langual.js'),
  nut_data = require('./models/nut_data.js'),
  nutr_def = require('./models/nutr_def.js'),
  src_cd = require('./models/src_cd.js'),
  weight = require('./models/weight.js');

var db = require('./db.js');

// PROMISE TESTING
function basePromise(req, res){
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM food_des WHERE NDB_No = '" + req.params.id + "'", function (err, result) {
      if (result.length == 0 || err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
}

function FdGrp_CdPromise(mainObj){
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM fd_group WHERE FdGrp_Cd = '" + mainObj.FdGrp_Cd + "'", function (err, FDresult) {
      if (err || FDresult.length == 0) {
        reject(err);
      } else {
        resolve(FDresult[0]);
      }
    });
  });
}

function NDPromise(mainObj){
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM nut_data WHERE NDB_No = '" + mainObj.NDB_No + "'", function (err, result) {
      if (err || result.length == 0) {
        reject("");
      } else {
        resolve(result);
      }
    });
  });
}

function nutFindPromise(mainObj) {
  return new Promise(function (resolve, reject) {
    for(var i = 0; i < mainObj.length; i++){
      db.query("SELECT * FROM nutr_def WHERE Nutr_No = '" + mainObj[i].Nutr_No + "'", function (err, result) {
        if (err || result.length == 0) {
          console.log(err)
        } else {
          resolve(result);
        }
      });
    }
  });
}

// EXPORTED FUNCTIONS
module.exports = {
  getrender: function (req, res) {
    res.render('datasearch.ejs');
  },

  getNBD: function (req, res) {
    // Pulls the NDB number from the request
    if (req.params.id != '') {
      // var query = food_des.find({ NDB_No: req.params.id.toString() });

      // Finds the central object by calling the base promise
      var baseP = basePromise(req, res);
      baseP.then(function(result){
        // Calls the FDPromise to get the food description.
        var FDPromise = FdGrp_CdPromise(result);
        FDPromise.then(function(FDresult){
          result.FdGrp_Desc = FDresult.FdGrp_Desc;
          var NDP = NDPromise(result);
          NDP.then(function(NDResult){
            result.nutrients = NDResult;
            // console.log(result);
            res.render('datashow.ejs', result);
          });
          // console.log(result);
          // res.render('datashow.ejs', result);
        });
      });
    } else {
      res.redirect('/datasearch');
    }
  },

  getName: function (req, res) {
    var longName = req.params.name;
    db.query("SELECT * FROM food_des WHERE (Long_Desc LIKE '%" + longName + "%')", function(err, result){
      if (err) {
        console.log(err);
      } else if (result.length != 0) {
        // Created a custom sort function that finds the searched word earliest in the string.
        result.sort(function (a, b) {
          var countA = 0;
          var countB = 0;
          for (var i = 0; i < a.Long_Desc.length - longName.length; i++) {
            if (
              a.Long_Desc.substring(i, i + longName.length).toUpperCase() !=
              longName.toUpperCase()
            ) {
              countA++;
            } else {
              break;
            }
          }
          for (var i = 0; i < b.Long_Desc.length - longName.length; i++) {
            if (
              b.Long_Desc.substring(i, i + longName.length).toUpperCase() !=
              longName.toUpperCase()
            ) {
              countB++;
            } else {
              break;
            }
          }
          if (countA == countB) {
            return a - b;
          }
          return countA - countB;
        })
        res.render('dataresults', { result: result });
      } else {
        res.render('datasearch');
      }
    });
  },

  getNDF: function (req, res) {
    var NDB_No = req.params.id;
    db.query("SELECT * FROM nut_data WHERE NDB_No= '" + NDB_No + "'", function(err, result){
      if (err) {
        console.log(err);
      } else if (result.length != 0) {
        res.render('NDFshow', { docs: result });
      } else {
        res.render('datasearch');
      }
    });
  },

  dspost: function (req, res) {
    var nbdInfo = req.body.NDB_No;
    var shrtName = req.body.Shrt_Desc;
    if (nbdInfo != '') {
      var rstring = '/datasearch/NDB/' + nbdInfo;
      res.redirect(rstring);
    } else {
      var rstring = '/datasearch/desc/' + shrtName;
      res.redirect(rstring);
    }
  }
}
