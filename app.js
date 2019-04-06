var bodyParser = require("body-parser"),
    express = require("express"),
    path = require("path"),
    mysql = require('mysql'),
    app = express();

var db = require('./db.js');

var routes = require('./routes');
app.use('/api', routes);

// Set up express usage
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render('landing');
});

// Renders routes from the routes.js file
app.get("/datasearch", routes);
app.get("/datasearch/NDB/:id", routes);
app.get("/datasearch/desc/:name", routes);
app.get("/datasearch/NDB/:id/NDF", routes);
app.post("/datasearch", routes);



var PORT = 4000;
app.listen(PORT, function(req, res){
    console.log("The server is running on port " + PORT + "!");
});