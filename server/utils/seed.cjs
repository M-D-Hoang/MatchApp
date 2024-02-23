const { returnUserArrayObject } = require('./readUser.js');
const { returnCarArrayObject } = require('./readCar.js');
const { returnItemArrayObject } = require('./readItem.js');
const DB = require('../db/db.js');
const path = require('path');
const userFilePath = path.join(__dirname, './SeedingDataset/userSeedDataset.csv');
const carFilePath = path.join(__dirname, './SeedingDataset/carSeedDataset.csv');
const itemFilePath = path.join(__dirname, './SeedingDataset/itemSeedDataset.csv');
let db;
// eslint-disable-next-line no-unused-vars
const occupyUserDB = async () => {
  const userDocuments = await returnUserArrayObject(userFilePath);
  let num = 0;
  try {
    db = new DB();
    for( const user of userDocuments){
      db.createUser(user);
      num++;
    }
    // eslint-disable-next-line no-console
    console.log(`Inserted ${num} users`);
  } catch (e) {
    console.error('could not seed users');
    // eslint-disable-next-line no-console
    console.dir(e);
  } finally {
    process.exit();
  }
};
// eslint-disable-next-line no-unused-vars
const occupyItemDB = async () => {
  const userData = await returnUserArrayObject(userFilePath);
  const itemDocuments = await returnItemArrayObject(itemFilePath, userData);
  let num = 0;
  try {
    db = new DB();
    for ( const item of itemDocuments){
      db.createListing(item);
      num++;
    }
    // eslint-disable-next-line no-console
    console.log(`Inserted ${num} items`);
  } catch (e) {
    console.error('could not seed items');
    // eslint-disable-next-line no-console
    console.dir(e);
  } finally {
    process.exit();
  }
};

// eslint-disable-next-line no-unused-vars
const occupyCarDB = async () => {
  const userData = await returnUserArrayObject(userFilePath);
  const carDocuments = await returnCarArrayObject(carFilePath, userData);
  let num = 0;
  try {
    db = new DB();
    for ( const car of carDocuments){
      db.createCarListing(car);
      num++;
    }
    // eslint-disable-next-line no-console
    console.log(`Inserted ${num} cars`);
  } catch (e) {
    console.error('could not seed cars');
    // eslint-disable-next-line no-console
    console.dir(e);
  } finally {
    process.exit();
  }
};

occupyUserDB();
occupyItemDB();
occupyCarDB();
