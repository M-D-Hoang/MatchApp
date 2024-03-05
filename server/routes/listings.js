const express = require('express');
const listingsRouter = express.Router();
const listingsController = require('../controllers/listingsController.js');
const imagesController = require('../controllers/imagesController.js');
const fileUpload = require('express-fileupload');

// URL: /api/listings/
listingsRouter.get('/items', listingsController.getItems);
listingsRouter.get('/cars', listingsController.getCars);
listingsRouter.get('/', listingsController.getAll);
listingsRouter.get('/car/:id', listingsController.getSingleCar);
listingsRouter.get('/item/:id', listingsController.getSingleItem);

listingsRouter.get('/itemsFiltered', listingsController.getItemsFiltered);
listingsRouter.get('/carsFiltered', listingsController.getCarsFiltered);

listingsRouter.use(
  //docs: https://www.npmjs.com/package/express-fileupload
  fileUpload({
    createParentPath: true,
  })
);
listingsRouter.post('/items', listingsController.postItem);
listingsRouter.post('/cars', listingsController.postCar);
listingsRouter.post('/items', imagesController.postImage);
listingsRouter.post('/cars', imagesController.postImage);

listingsRouter.delete('/items', listingsController.deleteItem);
listingsRouter.delete('/cars', listingsController.deleteCar);

listingsRouter.patch('/cars', listingsController.editCar);
listingsRouter.patch('/items', listingsController.editItem);
listingsRouter.patch('/items', imagesController.postImage);
listingsRouter.patch('/cars', imagesController.postImage);

module.exports = listingsRouter;
