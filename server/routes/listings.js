const express = require('express');
const listingsRouter = express.Router();
const listingsController = require('../controllers/listingsController.js');
const imagesController = require('../controllers/imagesController.js');
const fileUpload = require('express-fileupload');

// URL: /api/listings/
listingsRouter.get('/items', listingsController.getItems);
listingsRouter.get('/cars', listingsController.getCars);
listingsRouter.get('/', listingsController.getAll);

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

listingsRouter.patch('/items', listingsController.editItem);


module.exports = listingsRouter;
