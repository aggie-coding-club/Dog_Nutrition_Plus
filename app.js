var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    path = require("path"),
    monConnect = require("./config.js"),
    app = express();

var routes = require('./routes');
app.use('/api', routes);

// Import mongooose models
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

// Set up express usage
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://" + monConnect.username + ":" + monConnect.pass + "@ds055545.mlab.com:55545/dog-nutrition-plus");

app.get("/", function(req, res){
    res.render('landing');
});

app.get("/datasearch", routes);
app.get("/datasearch/NDB/:id", routes);
app.get("/datasearch/desc/:name", routes);
app.get("/datasearch/NDB/:id/NDF", routes);
app.post("/datasearch", routes);



var PORT = 4000;
app.listen(PORT, function(req, res){
    console.log("The server is running on port " + PORT + "!");
});