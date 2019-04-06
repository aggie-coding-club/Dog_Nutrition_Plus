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

// UNUSED (plan to populate nut_data ids with their acutal descriptions)
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
  // Query page (directs to post)
  getrender: function (req, res) {
    res.render('datasearch.ejs');
  },

  // Show page (primary)
  getNBD: function (req, res) {
    // Pulls the NDB number from the request using req.params.id
    if (req.params.id != '') {
      // Finds the central object by calling the base promise
      var baseP = basePromise(req, res);
      baseP.then(function(result){
        // Calls the FDPromise to get the food description.
        var FDPromise = FdGrp_CdPromise(result);
        FDPromise.then(function(FDresult){
          result.FdGrp_Desc = FDresult.FdGrp_Desc;
          // Calls NDPromise to get the nutritional data
          var NDP = NDPromise(result);
          NDP.then(function(NDResult){
            result.nutrients = NDResult;
            // Loads datashow.ejs with the combined results
            res.render('datashow.ejs', result);
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

  // Extra Show page for Nutritional information
  // An additional but unnecessary function (NOT LINKED IN PROJECT)
  getNDF: function (req, res) {
    var NDB_No = req.params.id;
    // Pulls only the nutritional data vs. the main show page
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

  // Post route (accepts queries)
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
