const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/userController.js');
const fileUpload = require('express-fileupload');

usersRouter.get('/:username', usersController.getUser);
usersRouter.post('/', usersController.postUser);
usersRouter.patch('/', usersController.editUser);
usersRouter.use(
  //docs: https://www.npmjs.com/package/express-fileupload
  fileUpload({
    createParentPath: true,
  })
);

module.exports = usersRouter;