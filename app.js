var bodyParser = require("body-parser"),
    express = require("express"),
    path = require("path"),
    mysql = require('mysql'),
    mongoose = require('mongoose'),
    keys = require('./keys'),
    cookieSession = require('cookie-session'),
    passport = require('passport');
    app = express();

mongoose.connect(keys.mongoKeys.userInfo.dbURI, () => {
    console.log("Connected to mongoDB user-info");
});

const passportSetup = require('./config/passport-setup');

var sqlDb = require('./db.js');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Setting up routes (part 1)
var routes = require('./routes');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const cartRoutes = require('./routes/cart-routes');
const dietRoutes = require('./routes/diet-routes');

app.use('/auth', authRoutes);
app.use('/diet', dietRoutes);
app.use('/profile', profileRoutes);
app.use('/cart', cartRoutes);
app.use('/api', routes);

// Set up express usage
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render('landing', { req: req });
});

// Renders routes from the routes.js file
app.get("/datasearch", routes);
app.get("/datasearch/NDB/:id", routes);
app.get("/datasearch/desc/:name", routes);
app.get("/datasearch/NDB/:id/NDF", routes);
app.post("/datasearch", routes);

app.get('/diet', routes);
app.get('/dietlist', routes);
app.get('/diet/:id', routes);
app.post('/diet', routes);





var PORT = 4000;
app.listen(PORT, function(req, res){
    console.log("The server is running on port " + PORT + "!");
});