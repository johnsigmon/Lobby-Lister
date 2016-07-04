const router = require('express').Router();
const { createUser, loginUser, } = require('../models/user');
////Create new user///
router.get('/new', function(req,res) {
  res.render('user/new');
});
///Redirect to login///
router.post('/new', createUser, function(req,res) {
  console.log(req.body);
  res.redirect('login');
});
////
router.get('/login', function(req,res) {
  res.render('user/login');
});

router.post('/login', loginUser, function(req,res) {
  console.log(res.user);
  req.session.user = res.user;

  req.session.save(function(err) {
    if(err) throw err;
    res.redirect('/');
  });
});
///////////////////////////////////////

//user logout
router.delete('/logout', function(req,res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

module.exports = router;
