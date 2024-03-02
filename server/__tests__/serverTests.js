/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Import required modules

const request = require('supertest');
const app = require('../server.js');
const DB = require('../db/db.js');
const { returnCarArrayObject } = require('../utils/readCar.js');
const { returnItemArrayObject } = require('../utils/readItem.js');
const { returnUserArrayObject } = require('../utils/readUser.js');
const path = require('path');
const fileCarPath = path.join(__dirname, 'testCarDataset.csv');
const fileItemPath = path.join(__dirname, 'testItemDataset.csv');
const fileUserPath = path.join(__dirname, 'testUserDataset.csv');
const jest = require('@jest/globals');

jest.mock('../db/db.js');

describe('Test helloworld Endpoint', () => {
  test('should get helloworld successfully', async () => {
    const response = await request(app).get('/api/helloworld');
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toEqual('hello world!');
  });
});
