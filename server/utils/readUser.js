const fs = require('fs');
const csv = require('csv-parser');
const userGenerationTools = require('./userGeneration.js');

async function returnUserArrayObject(csvFilePath) {
  const userData = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath).
      pipe(csv()).
      on('data', (row) => {
        const newUser = {
          username: userGenerationTools.generateRandomUsername(),
          password: userGenerationTools.generateRandomPassword(),
          firstName: row.first_name,
          lastName: row.last_name,
          birthday: userGenerationTools.generateRandomBirthday(),
          gender: row.gender,
          email: userGenerationTools.generateRandomEmail(),
          phoneNumber: userGenerationTools.generateRandomPhoneNumber(),
          picture: 'none',
          type: row.type
        };
        userData.push(newUser);
      }).
      on('end', () => {
        resolve();
      }).
      on('error', (error) => {
        reject(error);
      });
  });
  
  return userData;
}

module.exports = { returnUserArrayObject };