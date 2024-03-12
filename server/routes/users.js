const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/userController.js');
const fileUpload = require('express-fileupload');
// const fileUpload = require('express-fileupload'); 

usersRouter.get('/user/:username', usersController.getUser);

usersRouter.get('/check-auth', usersController.verifyAuth);

usersRouter.post('/login', usersController.Login);
usersRouter.post('/user', usersController.postUser);

usersRouter.patch('/user', usersController.editUser);

usersRouter.delete('/logout', usersController.Logout);

usersRouter.use(
  //docs: https://www.npmjs.com/package/express-fileupload
  fileUpload({
    createParentPath: true,
  })
);

module.exports = usersRouter;