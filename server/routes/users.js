const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/userController.js');
const fileUpload = require('express-fileupload');
const imagesController = require('../controllers/imagesController.js');

usersRouter.use(
  //docs: https://www.npmjs.com/package/express-fileupload
  fileUpload({
    createParentPath: true,
  })
);
usersRouter.get('/check-auth', usersController.verifyAuth);
usersRouter.post('/login', usersController.Login);
usersRouter.delete('/logout', usersController.Logout);
usersRouter.get('/:username', usersController.getUser);
usersRouter.post('/', usersController.postUser);
usersRouter.patch('/', usersController.editUser);
usersRouter.patch('/', imagesController.postImage);


module.exports = usersRouter;