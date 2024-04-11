const asyncHandler = require('express-async-handler');
const DB = require('../db/db.js');
const db = new DB();

/**
 * Gets all messages
 */
exports.getMessages = asyncHandler(async (req, res) => {
  const username = req.params.username;
  try {
    const messages = await db.getMessagesFromUser(username);
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).send('Internal DB error. Could not read messages');
  }
});

/**
 * Posts a message
 */
exports.postMessage = asyncHandler(async (req, res) => {
  const messageObj = req.body;
  try {
    await db.createMessage(messageObj);

    return res.status(200).send(messageObj);
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,
    });
  }
});

/**
 * Deletes a message
 */
exports.deleteMessage = asyncHandler(async (req, res) => {
  const messageID = req.body._id;

  try {
    await db.removeMessageByID(messageID);

    return res.status(204).json('Message Deleted');
  } catch (e) {
    res.status(400).json({
      content: e.message,
      status: 400,
    });
  }
});
