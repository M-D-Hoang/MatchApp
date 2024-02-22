const { returnUserArrayObject } = require('./readUser.js');
const { returnCarArrayObject } = require('./readCar.js');
const { returnItemArrayObject } = require('./readItem.js');
import DB from '../db/db.js';
const path = require('path');
const userFilePath = path.join(__dirname, './SeedingDataset/userSeedDataset.csv');
const carFilePath = path.join(__dirname, './SeedingDataset/carSeedDataset.csv');
const itemFilePath2 = path.join(__dirname, './SeedingDataset/itemSeedDataset.csv');
let userData;
let db;

const occupyUserDB = async () => {
  const userDocuments = await returnUserArrayObject(userFilePath);
  userData = userDocuments;

  try {
    db = new DB();
    await db.connect('fmp', 'users');
    const num = await db.createMany(userDocuments);
    // eslint-disable-next-line no-console
    console.log(`Inserted ${num} users`);
    await db.createIndex('users', { 
      username: 1,
    });
  } catch (e) {
    console.error('could not seed users');
    // eslint-disable-next-line no-console
    console.dir(e);
  } finally {
    if (db) {
      db.close();
    }
    process.exit();
  }
};

const occupyItemDB = async () => {
  const itemDocuments = await returnItemArrayObject(itemFilePath2, userData);
  
  try {
    db = new DB();
    await db.connect('fmp', 'items');
    const num = await db.createMany(itemDocuments);
    // eslint-disable-next-line no-console
    console.log(`Inserted ${num} items`);
    await db.createIndex('items', { 
      ownerID: 1,
      condition: 1,
      extraField: 1,
      category: 1,
    });
  } catch (e) {
    console.error('could not seed items');
    // eslint-disable-next-line no-console
    console.dir(e);
  } finally {
    if (db) {
      db.close();
    }
    process.exit();
  }
};

const occupyCarDB = async () => {
  const carDocuments = await returnCarArrayObject(carFilePath, userData);
  
  try {
    db = new DB();
    await db.connect('fmp', 'cars');
    const num = await db.createMany(carDocuments);
    // eslint-disable-next-line no-console
    console.log(`Inserted ${num} cars`);
    await db.createIndex('cars', { 
      ownerID: 1,
      condition: 1,
      make: 1,
      model: 1,
      bodyType: 1,
      transmission: 1,
      driveTrain: 1
    });
  } catch (e) {
    console.error('could not seed cars');
    // eslint-disable-next-line no-console
    console.dir(e);
  } finally {
    if (db) {
      db.close();
    }
    process.exit();
  }
};

const seedDatabase = async () => {
  try {
    await occupyUserDB();
    await occupyItemDB();
    await occupyCarDB();
  } catch (e) {
    console.error('Could not seed:', e);
  } finally {
    if (db) {
      db.close();
    }
    process.exit();
  }
};
// occupyUserDB();
// occupyItemDB();
// occupyCarDB();
seedDatabase();