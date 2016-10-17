const { MongoClient }     = require('mongodb');
const dbConnection        = process.env['MONGODB_URI']  ||'mongodb://localhost:27017/auth_practice';
const bcrypt              = require('bcrypt');
const salt                = bcrypt.genSalt(10);

function loginUser(req,res,next) {
  let email       = req.body.email;
  let password    = req.body.password;

  MongoClient.connect(dbConnection, function(err, db) {
    db.collection('users').findOne({ "email": email }, function(err, user) {
      if(err) throw err;
      if(user === null) {
        console.log('No account associated with email ',email);
      } else  if(bcrypt.compareSync(password, user.passwordDigest)){
        res.user = user;
      }
      next();
    })
  })
}

function createSecure(email, password, callback) {
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      callback(email,hash);
    })
  })
}

function createUser(req, res, next) {
  createSecure( req.body.email, req.body.password, saveUser)
  function saveUser(email, hash) {
    MongoClient.connect(dbConnection, function(err, db) {
      let userInfo = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: email,
        passwordDigest: hash,
        favoriteBills: []
      }
      db.collection('users').insertOne(userInfo, function(err, result) {
        if(err) throw err;
        next();
      });
    });
  }
}


function saveContent (req, res, next) {
  const userEmail = req.session.user.email;
  MongoClient.connect(dbConnection, function(err,db) {
    if(typeof userEmail !== undefined){
      let company = req.query.client_name;
      let amount = req.body.amount;
      console.log(company)

      db.collection('users')
      .update({ "email": userEmail },
        { $addToSet: {
        'favoriteBills': {
            'company': company,
            'details': amount

          }
        }
      }, function(err, result){
        if (err) throw err;
        console.log('added content to user page')
        next()

      })
      } else {
        console.log('not logged in')
      }
    })
  }

function loadUserProfile (req, res, next) {

    MongoClient.connect(dbConnection, function(err,db) {
      if (typeof req.session.user !== undefined) {
        db.collection('users').find({ email: req.session.user.email }).toArray((err,data)=>{
          if (err) throw err
            res.userProfile = data
          next()
        })
      }
    })
  }


module.exports = { createUser, loginUser, saveContent, loadUserProfile }
