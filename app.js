var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    path = require("path"),
    monConnect = require("./config.js"),
    app = express();

mongoose.connect("mongodb://" + monConnect.username + ":" + monConnect.pass + "@ds055545.mlab.com:55545/dog-nutrition-plus");

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "views/landing.html"));
});

app.listen(3000, function(req, res){
    console.log("The server is running on port 3000!");
});