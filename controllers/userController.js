const router = require('express').Router();
const { createUser, loginUser, saveContent } = require('../models/user');

router.get('/new', function(req,res) {
  res.render('user/new');
});

router.post('/new', createUser, function(req,res) {
  console.log(req.body);
  res.redirect('login');
});

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

//user profile routing//
router.get('/profile', function(req,res){
  if(typeof req.session.user !== undefined){
  res.render('user/profile')
  }else {
    res.redirect('/')
  }
})

router.post('/profile', saveContent, function(req, res) {
  console.log(req.body)
   res.redirect('/')
});

//user logout
router.delete('/logout', function(req,res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

module.exports = router;
