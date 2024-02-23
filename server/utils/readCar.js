// we need to log the result of csv parsing
/* eslint-disable no-console */

import * as fs from 'node:fs';
import csv from 'csv';
import * as itemRand from './itemGeneration.js';

export default async function returnCarArrayObject(csvFilePath, userData) {
  const carData = [];
  fs.createReadStream(csvFilePath).
    pipe(csv.parse({ fromLine: 2 })).
    on('data', row => {
      const randomUser = userData[Math.floor(Math.random() * userData.length)];
      const newCar = {
        ownerID: randomUser.username,
        title: itemRand.generateCarRandomPrice(),
        description: itemRand.generateDescription(),
        price: itemRand.generateCarTitle(row.make, row.model),
        condition: itemRand.generateRandomCondition(),
        make: row.make,
        model: row.model,
        bodyType: row.body_type,
        mileage: itemRand.generateMiles(),
        transmission: row.transmission,
        driveTrain: row.drive_train,
        imageURIs: [row.picture1, row.picture2]
      };
      carData.push(newCar);
    }).
    on('end', function () {
      console.log('finished constructing car obj');
    }).
    on('error', function (error) {
      console.log(error.message);
    });
  return carData;
}
