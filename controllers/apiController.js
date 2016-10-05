'use strict'
const express    = require('express')
const bodyParser = require('body-parser')
const apiRouter    = express.Router();
const { enigmaReturns } = require('../models/enigmaDB');

apiRouter.get('/', enigmaReturns, function(req,res) {
  console.log(res.results)
    res.render('search_return/index', {companies: res.results,
                                        details: res.rows } );

});

module.exports = apiRouter;
