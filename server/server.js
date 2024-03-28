require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
//Middleware imports
const locationRouter = require('./routes/location.js');
const listingsRouter = require('./routes/listings.js');
const userRouter = require('./routes/users.js');

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
app.use('/api/location', locationRouter);

app.use('/', express.static('../client/build/'));

//Custom 404 if no URLs found
app.use((req, res) => {
  res.status(404).json({content:'Page not found', status:404});
});

module.exports = app;
