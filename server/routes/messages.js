const express = require('express');
const messageRouter = express.Router();
const messagesController = require('../controllers/messagesController.js');

messageRouter.get('/', messagesController.getMessages);
messageRouter.post('/', messagesController.postMessage);
messageRouter.delete('/', messagesController.deleteMessage);

module.exports = messageRouter;