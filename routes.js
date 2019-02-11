var express = require('express');

// All routes here
var ds = require('./datasearch');

var router = express.Router();

// Datasearch routes
router.route('/datasearch').get(ds.getrender());
router.route('/datasearch/NDB/:id').get(ds.getNBD());
router.route('/datasearch/desc/:name').get(ds.getName());
router.route('/datasearch/NDB/:id/NDF').get(ds.getNDF());
router.route('/datasearch').post(ds.dspost());

module.exports = router;