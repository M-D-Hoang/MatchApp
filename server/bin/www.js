/* eslint-disable no-console */
const app = require('../server.js');
const port = process.env.PORT || 3000;

let server;

(async () => {
  server = app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
})();

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = server;