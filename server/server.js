require('dotenv').config();
const express = require('express');
// const MongoStore = require('connect-mongo');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
//Middleware imports
//const helloRouter = require('./routes/helloworld.js');
const listingsRouter = require('./routes/listings.js');
const userRouter = require('./routes/users.js');

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // store: MongoStore.create({
  //   mongoUrl: process.env.ATLAS_URI,
  //   dbName: 'test',
  //   ttl: 86400000
  // })
}));

//for testing only, we will remove it eventually
//app.use('/test-api', helloRouter);

app.use('/api/listings', listingsRouter);
app.use('/api/users', userRouter);

app.use('/', express.static('../client/build/'));

//Custom 404 if no URLs found
app.use((req, res) => {
  res.status(404).json({content:'Page not found', status:404});
});

module.exports = app;
