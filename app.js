var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    path = require("path"),
    monConnect = require("./config.js"),
    app = express();

// Import mongodb models
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://" + monConnect.username + ":" + monConnect.pass + "@ds055545.mlab.com:55545/dog-nutrition-plus");

var obj = {
    Title: null
};

app.get("/", function(req, res){
    res.render('landing', obj);
});

app.get("/query", function(req, res){
    
    res.json(obj);
});

app.post("/query", function(req, res){
    var query = data_src.find({ DataSrc_ID: "D3318" });

    if(req.body.firstname == ""){
        console.log("The value was null");
    }
    query.exec(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            obj = docs[0];
        }
    });

    res.redirect("/query");
});

app.get("/datasearch", function(req, res){
    res.render('datasearch.ejs');
});

app.get("/datasearch/NBD/:id", function(req, res){
    if (req.params.id != "") {
        var query = food_des.find({ NDB_No: req.params.id.toString() });
        query.exec(function (err, docs) {
            if (err) {
                console.log(err);
            } else if(docs.length != 0){
                res.render("datashow.ejs", docs[0]);

            } else{
                res.redirect("/datasearch");
            }
        });
    }

});

app.get("/datasearch/desc/:name", function(req, res){
    var shrtname = req.params.name;
    console.log(shrtname);
    var query = food_des.find({ "Shrt_Desc": { "$regex": shrtname, "$options": "$i"}});
    query.exec(function(err, docs){
        if(err){
            console.log(err);
        } else if(docs.length != 0){
            docs.sort(function(a, b){
                var countA = 0;
                var countB = 0;
                for (var i = 0; i < a.Shrt_Desc.length - shrtname.length; i++){
                    if (a.Shrt_Desc.substring(i, i + shrtname.length).toUpperCase() != shrtname.toUpperCase()){
                        countA++;
                    } else{
                        break;
                    }
                }
                for (var i = 0; i < b.Shrt_Desc.length - shrtname.length; i++) {
                    if (b.Shrt_Desc.substring(i, i + shrtname.length).toUpperCase() != shrtname.toUpperCase()) {
                        countB++;
                        // console.log(b.Shrt_Desc.substring(i, i + shrtname.length));
                    } else{
                        // console.log("The else statement occurs");
                        break;
                    }
                }
                if(countA == countB){
                    return a - b;
                }
                return countA - countB;

            });
            res.render("dataresults", {docs: docs});
        } else{
            res.render("datasearch");
        }
    });
});

app.post("/datasearch", function(req, res){
    var nbdInfo = req.body.NBD_No;
    var shrtName = req.body.Shrt_Desc;
    if(nbdInfo != ""){
        var rstring = "/datasearch/NBD/" + nbdInfo;
        res.redirect(rstring);
    } else {
        var rstring = "/datasearch/desc/" + shrtName;
        res.redirect(rstring);
    }
    
});

var PORT = 4000;
app.listen(PORT, function(req, res){
    console.log("The server is running on port " + PORT + "!");
});