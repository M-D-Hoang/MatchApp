const express = require('express');
const app = express();
// Middleware imports
const helloRouter = require('./routes/api.js');

app.use(express.json());

// at url /api/helloworld
app.use('/api', helloRouter);

app.use('/', express.static('../client/build/'));

// Custom 404 if no URLs found
app.use((req, res) => {
  res.status(404).json({ content: 'Page not found', status: 404 });
});

module.exports = app;