'use strict'
const express              = require('express');
const app                  = express();
const port                 = process.env.PORT || 3000;
const path                 = require('path');
const logger               = require('morgan');
const bodyParser           = require('body-parser');
const session              = require('express-session');
const methodOverride       = require('method-override');

const homeController       = require('./controllers/homeController');
const userController       = require('./controllers/userController');
const apiController        = require('./controllers/apiController');


app.set('view engine', 'ejs');

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'sooopersekret',
  cookie: {maxAge: 60000}
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(logger('dev'));

app.use('/bower_components', express.static(path.join(__dirname,'bower_components')));
app.use('/user', userController);
app.use('/search', apiController);
app.use('/', homeController);

app.listen(port, function() {
  console.log('Server is listening on ',port);
})
