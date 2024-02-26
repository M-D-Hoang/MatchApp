// we need to log the result of csv parsing
/* eslint-disable no-console */

import * as fs from 'node:fs';
import { parse } from 'csv-parse';
import * as itemRand from './itemGeneration.js';

export default async function returnItemArrayObject(csvFilePath, userData) {
  const itemData = [];
  fs.createReadStream(csvFilePath).
    pipe(parse({ fromLine: 2 })).
    on('data', row => {
      const randomUser = userData[Math.floor(Math.random() * userData.length)];
      const extraField = itemRand.handleCategory(row.categoryName);
      const newItem = {
        ownerID: randomUser.username,
        title: row.title,
        description: itemRand.generateDescription(),
        price: row.price,
        imageURIs: [row.imgUrl],
        condition: itemRand.generateRandomCondition(),
        extraField: extraField,
        category: row.categoryName
      };
      itemData.push(newItem);
    }).
    on('end', function () {
      console.log('finished constructing item obj');
    }).
    on('error', function (error) {
      console.log(error.message);
    });
  return itemData;
}
