var express = require("express"),
    app = express();

//Landing page
app.get("/",function(req, res){
    res.render("landing.ejs");
});











//in order to see the server, use localhost:5000 in the address bar of your browser after turning the server on with "node app.js"
app.listen(5000, function(req, res){
    console.log("The server is up!");
});