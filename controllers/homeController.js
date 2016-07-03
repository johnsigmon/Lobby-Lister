const router = require('express').Router();


router.get('/', function(req,res) {
  res.render('home/index',{user: req.session.user});
});

module.exports = router;
