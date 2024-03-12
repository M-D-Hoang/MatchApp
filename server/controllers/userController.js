const asyncHandler = require('express-async-handler');
const DB = require('../db/db.js');
const { OAuth2Client } = require('google-auth-library');
const User = require('../db/model/User.js');
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

exports.Login = asyncHandler(async (req, res) => {
  const { credential, clientId } = req.body;

  try {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId
    });
    const payload = ticket.getPayload();
    const newUser = new User({
      username: payload.email.split('@')[0],
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      type: 'client'
    });
    const user = await db.updateUser(newUser);

    if(!req.session) {
      req.session = {};
    }

    // TODO: Change this to just set username
    req.session.username = payload.email.split('@')[0];
    req.session.email = payload.email;
    req.session.picture = payload.picture;
    req.session.name = payload.name;
  
    return res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      status: 'error',
      message: e.message
    });
  }
});

// TODO: just check username then use getUser(username) to return user object for you to return
exports.verifyAuth = asyncHandler(async (req, res) => {
  if(req.session && req.session.username) {
    const userData = await db.readUser(req.session.username);
    res.status(200).json(userData);  
  } else {
    res.status(401).json('Not authenticated');
  }
});

exports.Logout = asyncHandler(async (req, res) => {
  await req.session.destroy();
  res.status(200).send('Logout successful');
});

