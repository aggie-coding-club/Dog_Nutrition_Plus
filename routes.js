var express = require('express');

// All routes here
var ds = require('./datasearch');

var router = express.Router();

// Datasearch routes
router.get('/datasearch', function(req, res){
    // ds.getrender(req, res);
    res.render('./datasearch.ejs');
} );
router.get('/datasearch/NDB/:id', function(req, res){
    ds.getNBD(req, res);
} );
router.get('/datasearch/desc/:name', function(req, res){
    ds.getName(req, res);
} );
router.get('/datasearch/NDB/:id/NDF', function(req, res){
    ds.getNDF(req, res);
} );
router.post('/datasearch', function(req, res){
    ds.dspost(req, res);
} );

module.exports = router;