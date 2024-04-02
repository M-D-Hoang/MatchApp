const express = require('express');
const listingsRouter = express.Router();
const locationController = require('../controllers/locationController.js');

// URL: /api/location/
listingsRouter.get('/:address', locationController.addressToCoordinates);

module.exports = listingsRouter;
