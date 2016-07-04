const router = require('express').Router();
const { saveContent, loadUserProfile } = require('../models/saveContent')

router.get('./mypage', (req,res)=>{res.render('./save', {user: req.session.user})})

router.post('/user', saveContent, loadUserProfile, function(req,res){
  console.log('made it this far')
res.render('user/userPage', {favorites: res.userProfile})

})

module.exports = router;
