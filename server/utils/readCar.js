const fs = require('fs');
const csv = require('csv-parser');
const itemGenerationTools = require('./itemGeneration.js');

async function returnCarArrayObject(csvFilePath, userData) {
  const carData = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath).
      pipe(csv()).
      on('data', (row) => {
        const randomUser = userData[Math.floor(Math.random() * userData.length)];
        const newCar = {
          ownerID: randomUser.username,
          title: itemGenerationTools.generateCarRandomPrice(),
          description: itemGenerationTools.generateDescription(),
          price: itemGenerationTools.generateCarTitle(row.make, row.model),
          condition: itemGenerationTools.generateRandomCondition(),
          make: row.make,
          model: row.model,
          bodyType: row.body_type,
          mileage: itemGenerationTools.generateMiles(),
          transmission: row.transmission,
          driveTrain: row.drive_train,
          imageURIs: [row.picture1, row.picture2]
        };
        carData.push(newCar);
      }).
      on('end', () => {
        resolve();
      }).
      on('error', (error) => {
        reject(error);
      });
  });

  return carData;
}

module.exports = { returnCarArrayObject };