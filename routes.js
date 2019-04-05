var express = require('express');

// All routes here
var ds = require('./datasearch');

var router = express.Router();

// Datasearch routes

// Query page
router.get('/datasearch', function(req, res){
    // ds.getrender(req, res);
    res.render('./datasearch.ejs');
} );
// Show page
router.get('/datasearch/NDB/:id', function(req, res){
    ds.getNBD(req, res);
} );
// Results page
router.get('/datasearch/desc/:name', function(req, res){
    ds.getName(req, res);
} );
// Extra Show page
router.get('/datasearch/NDB/:id/NDF', function(req, res){
    ds.getNDF(req, res);
} );
// Post route
router.post('/datasearch', function(req, res){
    ds.dspost(req, res);
} );

module.exports = router;