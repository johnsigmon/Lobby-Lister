const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const dbConnection = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/auth_practice';
const salt = bcrypt.genSalt(10);

function loginUser(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  MongoClient.connect(dbConnection, (err, db) => {
    db.collection('users').findOne({ "email": email }, (err, user) => {
      if (err) throw err;
      if (user === null) {
        console.log('No account associated with email ', email);
      } else if (bcrypt.compareSync(password, user.passwordDigest)) {
        res.user = user;
      }
      next();
    });
  });
}

function createSecure(email, password, callback) {
  bcrypt.genSalt((err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callback(email, hash);
    });
  });
}

function createUser(req, res, next) {
  createSecure( req.body.email, req.body.password, saveUser);
  function saveUser(email, hash) {
    MongoClient.connect(dbConnection, (err, db) => {
      let userInfo = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: email,
        passwordDigest: hash,
        favoriteArticles: [],
      };
      db.collection('users').insertOne(userInfo, (err, result) => {
        if (err) throw err;
        next();
      });
    });
  } }

function saveContent (req, res, next) {
  let article = req.body;
  let company = req.body.company;
  let amount = req.body.amount;
  let lobbyOrg = req.body.lobbyOrg;
  let lobbyist = req.body.lobbyist;
  let transID = req.body.transID;
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) throw err;
    db.collection('users').update(
        { "email": req.session.user.email },
          { $addToSet: {
            'favoriteArticles': {
               'company': company,
                'amount': amount,
              'lobbyOrg': lobbyOrg,
              'lobbyist': lobbyist,
              'transID': transID,
            },
          },
        }, (err, result) => {
          if (err) throw err;
          console.log('added content to user page');
          next();
        }
    );
  });
}

function deleteContent(req, res, next) {
  let transID = req.body.transID;
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) throw err;
    db.collection('users').update(
      { 'email': req.session.user.email },
        { $pull: { favoriteArticles: { transID: transID } } },
        { multi: true }
    );
  });
}

function loadUserProfile(req, res, next) {
  if (req.session && req.session.user) {
    MongoClient.connect(dbConnection, (err, db) => {
      if (err) throw err;
      db.collection('users').findOne({ email: req.session.user.email }, (err, user) => {
        if (user) {
          req.user = user;
          delete req.user.password;
          req.session.user = user;
          res.locals.user = user;
          next();
        } else {
          next();
        }
      });
    });
  }
}


module.exports = { createUser, loginUser, saveContent, loadUserProfile, deleteContent };
