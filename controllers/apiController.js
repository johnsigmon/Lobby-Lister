const router = require('express').Router();
const { enigmaReturns } = require('../models/enigmaDB');

// router.get('/results', function(req,res){
//     res.render('search_return/index');
// });

router.get('/', enigmaReturns, function(req,res) {
  // console.log(req.body);
  res.render('home/index', {companies: res.results } );
});
module.exports = router;
