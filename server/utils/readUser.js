const fs = require('fs');
const csv = require('csv-parser');
const userGenerationTools = require('./userGeneration.js');

async function returnUserArrayObject(csvFilePath) {
  const userData = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    /**
     * const newUser = {
     *  username: (MAKE SURE THIS IS A PRIMARY KEY)
     *  password:
     *  firstName:
     *  lastName:
     *  birthday:
     *  gender:
     *  email:
     *  phoneNumber:
     * }
     * 
     * userDate.push(newUser);
     */
  }).
  on('end', () => {
    resolve();
  }).
  on('error', (error) => {
    reject(error);
  });

  return userData;
}

module.exports = { returnUserArrayObject };