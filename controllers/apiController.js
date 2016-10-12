'use strict'
const express    = require('express')
const bodyParser = require('body-parser')
const apiRouter    = express.Router();
const { enigmaReturns, getDetails } = require('../models/enigmaDB');
/*const { d3Processing } = require('../models/d3Processing');*/

apiRouter.get('/', enigmaReturns, function(req,res) {

    res.render('search_return/index', {companies: res.results,
                                        details: res.rows } );
});

apiRouter.get('/details', function(req,res) {
  res.render('search_return/details', {details: res.rows} );
})

module.exports = apiRouter;
