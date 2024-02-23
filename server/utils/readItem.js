const fs = require('fs');
const csv = require('csv-parser');
const itemGenerationTools = require('./itemGeneration.js');

async function returnItemArrayObject(csvFilePath, userData) {
  const itemData = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath).
      pipe(csv()).
      on('data', (row) => {
        const randomUser = userData[Math.floor(Math.random() * userData.length)];
        const extraField = itemGenerationTools.handleCategory(row.category);
        const newItem = {
          ownerID: randomUser.username,
          title: row.title,
          description: itemGenerationTools.generateDescription(),
          price: row.price,
          imageURIs: [row.imgUrl],
          condition: itemGenerationTools.generateRandomCondition(),
          extraField: extraField,
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

module.exports = { returnItemArrayObject };