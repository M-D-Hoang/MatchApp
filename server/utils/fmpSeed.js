// we need to log the result of seeding
/* eslint-disable no-console */

// we don't care about speed when we're seeding
/* eslint-disable no-await-in-loop */

import returnUserArrayObject from './readUser.js';
import returnCarArrayObject from './readCar.js';
import returnItemArrayObject from './readItem.js';
import DB from '../db/db.js';
import path from 'path';

const userFilePath = path.join(__dirname, './SeedingDataset/userSeedDataset.csv');
const carFilePath = path.join(__dirname, './SeedingDataset/carSeedDataset.csv');
const itemFilePath = path.join(__dirname, './SeedingDataset/itemSeedDataset.csv');

(async () => {
  console.log('Parsing csv...');
  const userDocuments = await returnUserArrayObject(userFilePath);
  const userData = await returnUserArrayObject(userFilePath);
  const itemDocuments = await returnItemArrayObject(itemFilePath, userData);
  const carDocuments = await returnCarArrayObject(carFilePath, userData);
  console.log('done parsing!');

  let collRowsInserted = 0;
  let totalRowsInserted = 0;
  try {
    const db = new DB();
    // seeding users
    for ( const user of userDocuments){
      await db.createUser(user);
      collRowsInserted++;
    }
    console.log(`Inserted ${collRowsInserted} users`);

    totalRowsInserted += collRowsInserted;
    collRowsInserted = 0;
    // seeding items
    for ( const item of itemDocuments){
      await db.createListing(item);
      collRowsInserted++;
    }
    console.log(`Inserted ${collRowsInserted} items`);

    totalRowsInserted += collRowsInserted;
    collRowsInserted = 0;
    // seeding cars
    for ( const car of carDocuments){
      await db.createCarListing(car);
      collRowsInserted++;
    }
    console.log(`Inserted ${collRowsInserted} cars`);
    totalRowsInserted += collRowsInserted;
  } catch (e) {
    console.error('could not seed');
    console.dir(e);
  } finally {
    console.log(`\nTotal rows inserted: ${totalRowsInserted}`);
    process.exit();
  }
})();
