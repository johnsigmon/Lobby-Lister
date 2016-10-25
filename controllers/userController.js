const userRouter = require('express').Router();
const { createUser, loginUser, saveContent, loadUserProfile, deleteContent } = require('../models/user');

userRouter.get('/new', (req, res) => {
  res.render('user/new');
});

userRouter.post('/new', createUser, (req, res) => {
  res.redirect('login');
});

userRouter.get('/login', (req, res) => {
  res.render('user/login');
});

userRouter.post('/login', loginUser, (req, res) => {
  req.session.user = res.user;
  req.session.save((err) => {
    if (err) throw err;
    res.redirect('/user/mypage');
  });
});

userRouter.get('/mypage', loadUserProfile, (req, res) => {
  res.render('user/mypage', { user: req.session.user });
});

userRouter.post('/save-content', saveContent, (req, res) => {
  res.redirect('/user/mypage');
});

userRouter.delete('/mypage/delete-content', deleteContent, (req, res) => {
  res.redirect('/user/mypage');
});

userRouter.delete('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = userRouter;
