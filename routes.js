var express = require('express');

// All routes here
var ds = require('./datasearch');
var diet = require('./diet');

var router = express.Router();

// Datasearch routes

// Query page (directs to post)
router.get('/datasearch', function(req, res){
    ds.getrender(req, res);
} );
// Show page (primary)
router.get('/datasearch/NDB/:id', function(req, res){
    ds.getNBD(req, res);
} );
// Results page (For a list of pages)
router.get('/datasearch/desc/:name', function(req, res){
    ds.getName(req, res);
} );
// Extra Show page for Nutritional information
router.get('/datasearch/NDB/:id/NDF', function(req, res){
    ds.getNDF(req, res);
} );
// Post route (accepts queries)
router.post('/datasearch', function(req, res){
    ds.dspost(req, res);
} );

// Diet routes

// Input page
router.get('/diet', function(req, res){
    diet.dietLanding(req, res);
});
// List page
router.get('/dietlist', function (req, res) {

});
// Show page
router.get('/diet/:id', function (req, res) {

});
// Post route
router.post('/diet', function (req, res) {

});

module.exports = router;