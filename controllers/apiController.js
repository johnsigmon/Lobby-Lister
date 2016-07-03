'use strict'
const express    = require('express')
const bodyParser = require('body-parser')
const router    = express.Router();
const { enigmaReturns } = require('../models/enigmaDB');
// const companyinput = require('../public/js/script')


router.get('/', enigmaReturns, function(req,res) {
  console.log(enigmaReturns)
    res.render('search_return/index', {companies: res.results } );
});



module.exports = router;
