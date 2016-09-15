'use strict'
const express              = require('express');
const app                  = express();
const http                   = require('http').Server(app);
const io                     = require('socket.io')(http);
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
  cookie: {maxAge: 900000}
}));

io.on('connection', function(socket){
  socket.on('last search', function(search){
    io.emit('last search', search);
  });
});

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(logger('dev'));
app.use('/node_modules', express.static(path.join(__dirname,'node_modules')));

app.use('/user', userController);
app.use('/search', apiController);
app.use('/', homeController);

http.listen(port, function() {
  console.log('Server is listening on ',port);
})
