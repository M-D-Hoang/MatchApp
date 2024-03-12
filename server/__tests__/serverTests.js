/* eslint-disable max-len */
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
const fileCarPath = path.join(__dirname, '../utils/SeedingDataset/carSeedDataset.csv');
const fileItemPath = path.join(__dirname, '../utils/SeedingDataset/itemSeedDataset.csv');
const fileUserPath = path.join(__dirname, '../utils/SeedingDataset/userSeedDataset.csv');

jest.mock('../db/db.js');

// server/controllers/listingController.js
describe('Listing Controller Routes', () => {

  describe('GET SINGLE ITEM /items/:id', () => {
    test('should return a single item', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedItem = {
        id: 1,
        ...await returnItemArrayObject(fileItemPath, userArray)[0],
      };
      jest.spyOn(DB.prototype, 'readOneItem').mockResolvedValue(expectedItem);
      const response = await request(app).get('/api/listings/item/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedItem);
      expect(DB.prototype.readOneItem).toHaveBeenCalled();
    });
  });

  describe('GET SINGLE CAR /cars/:id', () => {
    test('should return a single car', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedCar = {
        id: 1, 
        ...await returnCarArrayObject(fileCarPath, userArray)[0]
      };
      jest.spyOn(DB.prototype, 'readOneCar').mockResolvedValue(expectedCar);
      const response = await request(app).get('/api/listings/car/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedCar);
      expect(DB.prototype.readOneCar).toHaveBeenCalled();
    });
  });

  describe('GET ALL /', () => {
    test('should return a list of all listings', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedCars = await returnCarArrayObject(fileCarPath, userArray);
      const expectedItems = await returnItemArrayObject(fileItemPath, userArray);
      const expectedConcatenatedListings = expectedItems.concat(expectedCars);
      jest.spyOn(DB.prototype, 'readAllListings').mockResolvedValue(expectedItems);
      jest.spyOn(DB.prototype, 'readAllCarListings').mockResolvedValue(expectedCars);
      const response = await request(app).get('/api/listings');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(expectedConcatenatedListings.length);
      expect(DB.prototype.readAllListings).toHaveBeenCalled();
      expect(DB.prototype.readAllCarListings).toHaveBeenCalled();
    });
  });

  describe('GET CARS FILTERED /cars-filtered', () => {
    test('should return a list of cars', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedCars = await returnCarArrayObject(fileCarPath, userArray);
      jest.spyOn(DB.prototype, 'readAllFilteredCarListings').mockResolvedValue(expectedCars);
      const response = await request(app).get('/api/listings/cars?make=Lexus');
      expect(response.status).toBe(200);  
      expect(response.body[0].make).toEqual('Lexus');
      expect(DB.prototype.readAllFilteredCarListings).toHaveBeenCalled();
    });
  });

  describe('GET ITEMS FILTERED /items-filtered', () => {
    test('should return a list of items', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedItems = await returnItemArrayObject(fileItemPath, userArray);
      jest.spyOn(DB.prototype, 'readAllFilteredListings').mockResolvedValue(expectedItems);
      const response = await request(app).get('/api/listings/items?category=Games&Toys');
      expect(response.status).toBe(200);
      expect(response.body[0].category).toEqual('Games&Toys');
      expect(DB.prototype.readAllFilteredListings).toHaveBeenCalled();
    });
  });

  describe('POST ITEM /items', () => {
    test('should return a new item', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedItem = await returnItemArrayObject(fileItemPath, userArray)[0];
      const response = await request(app).
        post('/api/listings/items').
        send(expectedItem);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('content');
    });
  });

  describe('POST CAR /cars', () => {
    test('should return a new car', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedCar = await returnCarArrayObject(fileCarPath, userArray)[0];
      const response = await request(app).
        post('/api/listings/cars').
        send(expectedCar);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('content');
    });
  });

  describe('EDIT ITEM /items', () => {
    test('should return a new item', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedItem = await returnItemArrayObject(fileItemPath, userArray)[0];
      const response = await request(app).
        patch('/api/listings/items').
        send(expectedItem);
      expect(response.status).toBe(200);
    });
  });

  describe('EDIT CAR /cars', () => {
    test('should return a new car', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedCar = await returnCarArrayObject(fileCarPath, userArray)[0];
      const response = await request(app).
        patch('/api/listings/cars').
        send(expectedCar);
      expect(response.status).toBe(200);
    });
  });
});

describe('User Controller Routes', () => { 
  describe('GET USER /user', () => {
    test('should return a user', async () => {
      const userArray = await returnUserArrayObject(fileUserPath);
      const expectedUser = userArray[0];
      jest.spyOn(DB.prototype, 'readUser').mockResolvedValue(expectedUser);
      const response = await request(app).get(`/api/users/${expectedUser.username}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedUser);
      expect(DB.prototype.readUser).toHaveBeenCalled();
    });
  });

  describe('POST USER /user', () => {
    test('should return a new user', async () => {
      const expectedUser = await returnUserArrayObject(fileUserPath)[0];
      const response = await request(app).
        post('/api/users').
        send(expectedUser);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('content');
    });
  });
  // describe('EDIT USER /user', () => {
  //   test('should return a new user', async () => {
  //     const expectedUser = await returnUserArrayObject(fileUserPath)[0];
  //     const response = await request(app).
  //       patch('/api/users/user').
  //       send(expectedUser);
  //     expect(response.status).toBe(201);
  //   });
  // });
});