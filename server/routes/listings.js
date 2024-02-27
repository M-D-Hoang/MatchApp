const express = require('express');
const listingsRouter = express.Router();
const listingsController = require('../controllers/listingsController.js');
const fileUpload = require('express-fileupload');



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

module.exports = listingsRouter;
