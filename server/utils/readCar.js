const fs = require('fs');
const csv = require('csv-parser');
const itemGenerationTools = require('./itemGeneration.js');

async function returnUserArrayObject(csvFilePath) {
  const carData = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    /**
     * const newCar = {
     * title
     * description
     * price
     * condition
     * make
     * model
     * body_type
     * mileage
     * transmission
     * picture []z c
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

  return carData;
}

module.exports = { returnUserArrayObject };