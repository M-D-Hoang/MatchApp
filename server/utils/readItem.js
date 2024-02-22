const fs = require('fs');
const csv = require('csv-parser');
const itemGenerationTools = require('./itemGeneration.js');

async function returnUserArrayObject(csvFilePath, userData) {
  const itemData = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath).
      pipe(csv()).
      on('data', (row) => {
        const randomUser = userData[Math.floor(Math.random() * userData.length)];
        const newItem = {
          ownerID: randomUser.username,
          title: row.title,
          description: itemGenerationTools.generateDescription(),
          price: row.price,
          imageURIs: [row.imgUrl],
          condition: itemGenerationTools.generateRandomCondition(),
          extraField: itemGenerationTools.handleCategory(row.category),
          category: row.category
        };
        
        itemData.push(newItem);
      }).
      on('end', () => {
        resolve();
      }).
      on('error', (error) => {
        reject(error);
      });
  });

  return itemData;
}

module.exports = { returnUserArrayObject };