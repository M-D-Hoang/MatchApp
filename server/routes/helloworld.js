const express = require('express');
const { imageUploadRouter } = require('./imageUpload.js');
const helloRouter = express.Router();
const DB = require('../db/db.js');
const db = new DB();

helloRouter.use('/users', async (req, res)=>{
  try{
    const users = await db.readAllUsers();
    res.status(200).json({content:users, response:200});
  } catch{
    res.status(500).send('Internal DB error. Could not read users');
  }
});

helloRouter.use('/helloworld', (req, res)=>{
  res.json({
    content:'hello world!',
    'response':200
  });
});

helloRouter.use('/listings', async (req, res) => {
  try {
    const listings = await db.readAllListings();
    res.status(200).json({content: listings, response: 200});
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

helloRouter.use('/upload', imageUploadRouter);

helloRouter.post('/comment', async (req, res) => {
  console.log(req.body);
  try {
    await db.addComment(req.body.name, req.body.comment, req.body.dateTime);
    return res.status(200).send({status:201, name:req.body.name, comment: req.body.comment});
  } catch (e) {
    res.status = 400;
    res.json({
      content:e.message,
      status:400
    });
  }

});

helloRouter.use('/', (req, res)=>{
  res.json({
    content:'Welcome to the API zone',
    options:['helloworld', 'users'],
    'response':200
  });
});

module.exports = helloRouter;
