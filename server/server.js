require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
//Middleware imports
const locationRouter = require('./routes/location.js');
const listingsRouter = require('./routes/listings.js');
const userRouter = require('./routes/users.js');
const messageRouter = require('./routes/messages.js');

const fs = require('fs');
let STATIC_FILES;
if (!process.env.TEST){
  STATIC_FILES = fs.readdirSync('../client/build/');
}

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

//for testing only, we will remove it eventually
//app.use('/test-api', helloRouter);

app.use('/api/listings', listingsRouter);
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/location', locationRouter);

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
