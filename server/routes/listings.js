const express = require('express');
const listingsRouter = express.Router();
const listingsController = require('../controllers/listingsController.js');
const fileUpload = require('express-fileupload');



listingsRouter.get('/items', listingsController.getItems);
listingsRouter.get('/cars', listingsController.getCars);
listingsRouter.get('/', listingsController.getAll);
listingsRouter.get('/car/:id', listingsController.getSingleCar);
listingsRouter.get('/item/:id', listingsController.getSingleItem);

listingsRouter.get('/items-filtered', listingsController.getItemsFiltered);
listingsRouter.get('/cars-filtered', listingsController.getCarsFiltered);

listingsRouter.use(
  //docs: https://www.npmjs.com/package/express-fileupload
  fileUpload({
    createParentPath: true,
  })
);

listingsRouter.post('/items', listingsController.postItem);
listingsRouter.post('/cars', listingsController.postCar);

listingsRouter.patch('/cars', listingsController.editCar);
listingsRouter.patch('/items', listingsController.editItem);

module.exports = listingsRouter;
