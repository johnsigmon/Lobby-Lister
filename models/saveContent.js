const { MongoClient } = require('mongodb');
const dbConnection = process.env['MONGODB_URI']  ||'mongodb://localhost:27017/auth_practice';

//James assisted//
function saveContent (req, res, next) {
  console.log('made it to the model')
  const userEmail = req.session.user.email;
  console.log(userEmail)
  MongoClient.connect(dbConnection, function(err,db) {
    if(typeof userEmail !== undefined){
      let currentContent = req.body;
      res.savedContent = req.body;
      console.log(currentContent)
      let savedContent ={$push: {favorites: currentContent}}
      db.collection('users').update({"email": userEmail}, savedContent, function(err, result){
        if(err) throw err;
        console.log('added content to user page')

        next()
      })
      }else{
        console.log('not logged in')
      }
    })
  }





  function loadUserProfile (req, res, next) {
    MongoClient.connect(dbConnection, function(err,db) {
      if(typeof req.session.user !== undefined) {
        db.collection('users').find({email: req.session.user.email}).toArray((err,data)=>{
          if(err) throw err
            res.userProfile = data
          next()
        })
      }
    })
  }


// ​
// function saveArt(req, res, next){
//   console.log('sent to model')
//   const userEmail = req.session.user.email;
//   console.log(req.session.user.email)
//   MongoClient.connect(dbConnection, function(err, db){
//     let art = req.body.source;
//     let saveData = {$push: {favorites: art}}
//     db.collection('users').update({'email': userEmail}, saveData, function(err, result){
//       if(err) throw err;
//       console.log('found user, added art')
//       next()
//     })
//   })
// }
// ​
// module.exports = {saveArt};

module.exports = { saveContent, loadUserProfile }
