require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const app = express();
//Middleware imports
const listingsRouter = require('./routes/listings.js');
const userRouter = require('./routes/users.js');
const fs = require('fs');
let STATIC_FILES;
if (!process.env.TEST){
  STATIC_FILES = fs.readdirSync('../client/build/');
}

// Register middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(compression());
app.use(function (req, res, next) {
  res.set('Cache-control', 'public, max-age=31536000');
  next();
});

// Register routes
app.use('/api/listings', listingsRouter);
app.use('/api/users', userRouter);

// app.use('/', express.static('../client/build/'));
app.use('/static', express.static('../client/build/static'));
app.get('/*', (req, res) => {

  const file = req.path.split('/')[1];
  if (STATIC_FILES.includes(file)) {
    res.sendFile(file, {root: '../client/build/'});
    return;
  }
  res.sendFile('index.html', { root: '../client/build/'});

});

//Custom 404 if no URLs found
app.use((req, res) => {
  res.status(404).json({content:'Page not found', status:404});
});
module.exports = app;
