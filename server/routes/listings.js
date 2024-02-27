const express = require('express');
const listingsRouter = express.Router();
const listingsController = require('../controllers/listingsController.js');

listingsRouter.get('/items', listingsController.getItems);
listingsRouter.get('/cars', listingsController.getCars);

listingsRouter.post('/items', listingsController.postItem)
listingsRouter.post('/cars', listingsController.postCar)

listingsRouter.get('/', listingsController.getAll);

module.exports = listingsRouter;
