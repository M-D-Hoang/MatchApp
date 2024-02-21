const { returnUserArrayObject } = require('./readUser.js');
const path = require('path');
const userFilePath = path.join(__dirname, './SeedingDataset/userSeedDataset.csv');
const itemFilePath = path.join(__dirname, './SeedingDataset/carSeedDataset.csv');

const occupyDB = async () => {
  const userDocuments = await returnUserArrayObject(userFilePath);

  try {
    const db = new DB();
    await db.connect('fmp', 'users');
    const num = await db.createMany(userDocuments);
    // eslint-disable-next-line no-console
    console.log(`Inserted ${num} users`);
    await db.createIndex('users', { 
      // ADD INDEX IF NEEDE
      // EX: firstName: 1
    });
  } catch (e) {
    console.error('could not seed');
    // eslint-disable-next-line no-console
    console.dir(e);
  } finally {
    if (db) {
      db.close();
    }
    process.exit();
  }
};

occupyDB();