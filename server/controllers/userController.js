const asyncHandler = require('express-async-handler');
const DB = require('../db/db.js');
const db = new DB();

exports.getUser = asyncHandler(async (req, res) => {
  try {
    const filter = {};
    filter.username =  req.params.username;
    const user = await db.readUser(filter);
    res.status(200).json(user);
  } catch (e){
    
    res.status(500).send('Internal DB error. Could not read user');
  }
});

exports.editUser = asyncHandler(async (req, res) => {
  const userObj = req.body;
  try {
    const mongoRes = await db.updateUser(userObj);
    return res.status(201).send(mongoRes);
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,
    });
  }
});

exports.postUser = asyncHandler(async (req, res) => {
  const userObj = req.body;
  try {
    await db.createUser(userObj);
    return res.status(200).send(userObj);
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,
    });
  }
});