var db = require('./db.js');

// Callback Function Testing
function mainCall(mainID, callback) {
  db.query("SELECT * FROM food_des WHERE NDB_No = '" + mainID + "'", function (err, result) {
    if (result.length == 0 || err) {
      console.log("Error in mainCall:" + err);
    } else {
      callback(result[0]);
    }
  });
}

function FdGrp_CdCall(fgID, callback) {
  db.query("SELECT * FROM fd_group WHERE FdGrp_Cd = '" + fgID + "'", function (err, FDresult) {
    if (err || FDresult.length == 0) {
      console.log("Error in FdGrp_CdCall: " + err);
    } else {
      callback(FDresult[0]);
    }
  });
}

function NDCall(mainID, callback) {
  db.query("SELECT * FROM nut_data WHERE NDB_No = '" + mainID + "'", function (err, result) {
    if (err || result.length == 0) {
      console.log("Error in NDCall: " + err);
    } else {
      let nameArr = [];
      nutFindCall(result, function (output, cont) {
        nameArr.push(output);
        if (cont) {
          callback(nameArr, result);
        }
      });
    }
  });
}

// UNUSED (plan to populate nut_data ids with their acutal descriptions)
function nutFindCall(mainObjs, callback) {
  for (let i = 0; i < mainObjs.length; i++) {
    db.query("SELECT NutrDesc FROM nutr_def WHERE Nutr_No = '" + mainObjs[i].Nutr_No + "'", function (err, result) {
      if (err || result.length == 0) {
        console.log("Error in nutFindCall: " + err);
      } else {
        // console.log(result);
        if (i < mainObjs.length - 1) {
          callback(result[0], false);
        } else {
          callback(result[0], true);
        }
      }
    });
  }
}

// EXPORTED FUNCTIONS
module.exports = {
  // Query page (directs to post)
  getrender: function (req, res) {
    res.render('datasearch.ejs');
  },

  // Show page (primary)
  getNBD: function (req, res) {
    // Pulls the NDB number from the request using req.params.id
    if (req.params.id != '') {
      mainCall(req.params.id, function (output) {
        FdGrp_CdCall(output.FdGrp_Cd, function (fGroup) {
          output.FdGrp_Desc = fGroup.FdGrp_Desc;
          NDCall(req.params.id, function (names, totalObj) {
            output.nutrients = [];
            names.forEach(obj => {
              output.nutrients.push({ NutrDesc: obj.NutrDesc});
            });
            for(var i = 0; i < output.nutrients.length; i++){
              output.nutrients[i].Nutr_Val = totalObj[i].Nutr_Val;
            }
            console.log(output);
            output.user = req.user;
            res.render("datashow.ejs", output);
          });
        });
      });
    } else {
      res.redirect('/datasearch');
    }
  },

  // Results page (For a list of pages)
  getName: function (req, res) {
    var longName = req.params.name;
    db.query("SELECT * FROM food_des WHERE (Long_Desc LIKE '%" + longName + "%')", function (err, result) {
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
        res.render('dataresults', { 
          result: result,
          user: req.user
        });
      } else {
        res.render('datasearch');
      }
    });
  },

  // Extra Show page for Nutritional information
  // An additional but unnecessary function (NOT LINKED IN PROJECT)
  getNDF: function (req, res) {
    var NDB_No = req.params.id;
    // Pulls only the nutritional data vs. the main show page
    db.query("SELECT * FROM nut_data WHERE NDB_No= '" + NDB_No + "'", function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length != 0) {
        res.render('NDFshow', { docs: result });
      } else {
        res.render('datasearch');
      }
    });
  },

  // Post route (accepts queries)
  dspost: function (req, res) {
    var shrtName = req.body.Shrt_Desc;
    var rstring = '/datasearch/desc/' + shrtName;
    res.redirect(rstring);
    // if (nbdInfo != '') {
    //   var rstring = '/datasearch/NDB/' + nbdInfo;
    //   res.redirect(rstring);
    // } else {
    //   var rstring = '/datasearch/desc/' + shrtName;
    //   res.redirect(rstring);
    // }
  }
}
