const fs = require('fs');
const csv = require('csv-parser');
const itemGenerationTools = require('./itemGeneration.js');

async function returnUserArrayObject(csvFilePath) {
  const itemData = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    /**
     * const newItem = {
     * title
     * description
     * price
     * image
     * condition
     * extraField
     * category
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

  return itemData;
}

module.exports = { returnUserArrayObject };