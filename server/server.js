const express = require('express');
const app = express();
//Middleware imports
//const helloRouter = require('./routes/helloworld.js');
const listingsRouter = require('./routes/listings.js');

app.use(express.json());

//for testing only, we will remove it eventually
//app.use('/test-api', helloRouter);

app.use('/api/listings', listingsRouter);

app.use('/', express.static('../client/build/'));

//Custom 404 if no URLs found
app.use((req, res) => {
  res.status(404).json({content:'Page not found', status:404});
});

module.exports = app;
