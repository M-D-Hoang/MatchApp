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
  try {
    db = new DB();
    const createUserPromises = userDocuments.map(user => db.createUser(user));
    await Promise.all(createUserPromises);
    // eslint-disable-next-line no-console
    console.log(`Inserted ${userDocuments.length} users`);
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
  try {
    db = new DB();
    const createListingPromises = itemDocuments.map(item => db.createListing(item));
    await Promise.all(createListingPromises);
    // eslint-disable-next-line no-console
    console.log(`Inserted ${itemDocuments.length} items`);
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
  try {
    db = new DB();
    const createCarListingPromises = carDocuments.map(car => db.createCarListing(car));
    await Promise.all(createCarListingPromises);
    // eslint-disable-next-line no-console
    console.log(`Inserted ${carDocuments.length} cars`);
  } catch (e) {
    console.error('could not seed cars');
    // eslint-disable-next-line no-console
    console.dir(e);
  } finally {
    process.exit();
  }
};

// Uncomment 1 at a time

// occupyUserDB();
occupyItemDB();
// occupyCarDB();
