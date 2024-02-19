import app from '../server.js';
// import DB from '../db/db.js';
const port = process.env.PORT || 3000;

let server;
(async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    // const db = new DB();
  } catch (e) {
    console.error('could not connect');
    console.dir(e);
    process.exit();
  }
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

export default server;
//module.exports = server;