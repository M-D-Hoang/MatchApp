// we need to log the result of csv parsing
/* eslint-disable no-console */

import * as fs from 'node:fs';
//import { parse } from 'csv/sync';
import { parse } from 'csv-parse';
import * as userRand from './userGeneration.js';

export default async function returnUserArrayObject(csvFilePath) {
  const userData = [];
  fs.createReadStream(csvFilePath).
    pipe(parse({ fromLine: 2 })).
    on('readable', row => {
      const newUser = {
        username: userRand.generateRandomUsername(),
        password: userRand.generateRandomPassword(),
        firstName: row.first_name,
        lastName: row.last_name,
        birthday: `${userRand.getRandomYear()}-
        ${userRand.getRandomMonth()}-${userRand.getRandomDay()}`,
        gender: row.gender,
        email: userRand.generateRandomEmail(),
        phoneNumber: userRand.generateRandomPhoneNumber(),
        picture: 'none',
        type: row.type
      };
      userData.push(newUser);
    }).
    on('end', function () {
      console.log('finished constructing user obj');
    }).
    on('error', function (error) {
      console.log(error.message);
    });
  return userData;
}
