'use strict'
const express    = require('express')
const bodyParser = require('body-parser')
const apiRouter    = express.Router();
const { enigmaReturns, enigmaDetails } = require('../models/enigmaDB');
// const companyinput = require('../public/js/script')


apiRouter.get('/', enigmaReturns, function(req,res) {
    res.render('search_return/index', {companies: res.results,
                                        details: res.results } );


});

apiRouter.get('/details', enigmaDetails, function(req,res) {
    res.render('search_return/details', {details: res.results} );




});




module.exports = apiRouter;
