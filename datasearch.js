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

module.exports = {
  getrender: function (req, res) {
    res.render('datasearch.ejs');
  },

  getNBD: function (req, res) {
    // Pulls the NDB number from the request
    if (req.params.id != '') {
      var query = food_des.find({ NDB_No: req.params.id.toString() });
      query.exec(function (err, docs) {
        if (err) {
          console.log(err);
        } else if (docs.length != 0) {
          // Creates a new query to find the food group information
          var FDquery = fd_group.find({ FdGrp_Cd: docs[0].FdGrp_Cd })
          FDquery.exec(function (err, FDdocs) {
            if (err) {
              console.log(err);
            } else if (FDdocs.length != 0) {
              docs[0].FdGrp_Desc = FDdocs[0].FdGrp_Desc;
              // Finds all of the nutrient data associated with a food (if any)
              // var NDquery = nut_data.find({ NDB_No: req.params.id });
              // NDquery.exec(function (err, NDdocs){
              //     if(err){
              //         console.log(err);
              //     } else if(NDdocs.length != 0){
              //         docs[0].nutData = [];
              //         NDdocs.forEach(obj => {
              //             docs[0].nutData.push(obj);
              //         });
              //         res.render("datashow.ejs", docs[0]);
              //     } else{
              //         res.render("datashow.ejs", docs[0]);
              docs[0].nutData = [0]; // Currently a placeholder until we can get the nutrition data to respond properly
              res.render('datashow.ejs', docs[0]);
            }
          })
          // res.render("datashow.ejs", docs[0]);
        } else {
          res.redirect('/datasearch');
        }
      })
    } else {
      res.redirect('/datasearch');
    }
  },

  getName: function (req, res) {
    // var names = req.params.name.split(" ");
    // var matched = [];
    // names.forEach(shrtname => {
    //     var query = food_des.find({ "Shrt_Desc": { "$regex": shrtname, "$options": "$i" } });
    //     query.exec(function (err, docs) {
    //         if (err) {
    //             console.log(err);
    //         } else if (docs.length != 0 && matched.length == 0){
    //             docs.forEach(doc => {
    //                 matched.push(doc.NDB_No);
    //             });
    //         } else if(docs.length != 0 && matched.length != 0){
    //             matched.forEach(num => {
    //                 docs.forEach(doc => {
    //                     if(doc.NDB_No == num){
    //                         console.log("Match");
    //                     }
    //                 })
    //             })
    //         } else {
    //             res.render("datasearch");
    //         }
    //     });

    // });
    // console.log(matched);

    var longName = req.params.name;
    var query = food_des.find({
      Long_Desc: { $regex: longName, $options: '$i' }
    });
    query.exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else if (docs.length != 0) {
        // Created a custom sort function that finds the searched word earliest in the string.
        docs.sort(function (a, b) {
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
        res.render('dataresults', { docs: docs });
      } else {
        res.render('datasearch');
      }
    })

    // matched.sort(function (a, b) {
    //     var countA = 0;
    //     var countB = 0;
    //     for (var i = 0; i < a.Shrt_Desc.length - shrtname.length; i++) {
    //         if (a.Shrt_Desc.substring(i, i + shrtname.length).toUpperCase() != shrtname.toUpperCase()) {
    //             countA++;
    //         } else {
    //             break;
    //         }
    //     }
    //     for (var i = 0; i < b.Shrt_Desc.length - shrtname.length; i++) {
    //         if (b.Shrt_Desc.substring(i, i + shrtname.length).toUpperCase() != shrtname.toUpperCase()) {
    //             countB++;
    //         } else {
    //             break;
    //         }
    //     }
    //     if (countA == countB) {
    //         return a - b;
    //     }
    //     return countA - countB;
    // });
    // res.render("dataresults", {docs: matched});
  },

  getNDF: function (req, res) {
    var NDB_No = req.params.id;
    var query = nut_data.find({ NDB_No: NDB_No });
    query.exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else if (docs.length != 0) {
        console.log(docs);
        res.render('NDFshow', { docs: docs });
      } else {
        res.render('datasearch');
      }
    })
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
