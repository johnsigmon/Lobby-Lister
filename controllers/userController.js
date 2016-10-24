const userRouter = require('express').Router();
const { createUser, loginUser, saveContent, loadUserProfile } = require('../models/user');
////Create new user///
userRouter.get('/new', (req,res)=> {res.render('user/new')});
///Redirect to login///
userRouter.post('/new', createUser, (req,res)=> {res.redirect('login')});
////
userRouter.get('/login', (req,res)=> {res.render('user/login')});

userRouter.post('/login', loginUser, (req,res)=> {
  req.session.user = res.user;
  req.session.save((err)=> {
    if(err) throw err;
    res.redirect('/user/mypage');
  });
});
///////////
userRouter.get('/mypage', loadUserProfile, (req,res)=>{
  res.render('user/mypage', {user: req.session.user, userInfo: res.userProfile})})

userRouter.post('/save-content', saveContent, (req,res)=>{
  res.redirect('/user/mypage')
});


///////////////////////////////////////
//user logout
userRouter.delete('/logout', (req,res)=> {
  req.session.destroy((err)=> {
    res.redirect('/');
  });
});

module.exports = userRouter;
