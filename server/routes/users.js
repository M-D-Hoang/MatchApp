const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/userController.js');
const fileUpload = require('express-fileupload');

usersRouter.get('/user/:username', usersController.getUser);
usersRouter.post('/user', usersController.postUser);
usersRouter.patch('/user', usersController.editUser);
usersRouter.use(
  //docs: https://www.npmjs.com/package/express-fileupload
  fileUpload({
    createParentPath: true,
  })
);