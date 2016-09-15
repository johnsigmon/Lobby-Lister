'use strict'
const express    = require('express')
const bodyParser = require('body-parser')
const apiRouter    = express.Router();
const { enigmaReturns, updateGraph } = require('../models/enigmaDB');



apiRouter.get('/', enigmaReturns, function(req,res) {
    res.render('search_return/index', {companies: res.results } );
});



module.exports = apiRouter;
