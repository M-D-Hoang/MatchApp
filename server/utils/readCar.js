/* eslint-disable no-cond-assign */
// we need to log the result of csv parsing
/* eslint-disable no-console */

import * as fs from 'node:fs';
import { parse } from 'csv-parse';
import * as itemRand from './itemGeneration.js';

export default async function returnCarArrayObject(csvFilePath, userData) {
  const carData = [];
  const parser = parse({ fromLine: 2 });
  fs.createReadStream(csvFilePath).
    pipe(parse({ fromLine: 2 })).
    on('readable', () => {
      const randomUser = userData[Math.floor(Math.random() * userData.length)];
      let row;
      while ((row = parser.read()) !== null) {
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
      }
    }).
    on('end', function () {
      console.log('finished constructing car obj');
    }).
    on('error', function (error) {
      console.log(error.message);
    });
  return carData;
}
