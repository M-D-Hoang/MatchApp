/* eslint-disable no-console */
const express = require('express');
// const { imageUploadRouter } = require('./imageUpload.js');
const helloRouter = express.Router();
const DB = require('../db/db.js');
const db = new DB();
import fileUpload from 'express-fileupload';



helloRouter.use(
  //docs: https://www.npmjs.com/package/express-fileupload
  fileUpload({
    createParentPath: true,
  })
);


helloRouter.post('/listing', (req, res) => {
  console.log(req.body);
  console.log(req.files);

  //db is not implemented yet, for now, echo the body content
  try {
    //await db.addComment(req.body.name, req.body.comment, req.body.dateTime);
   
    return res.status(200).send({status:201, content:[req.body, req.files]});
  } catch (e) {
    res.status = 400;
    res.json({
      content:e.message,
      status:400
    });
  }
    
  

});

helloRouter.use('/listings', async (req, res) => {
  try {
    const listings = await db.readAllListings();
    res.status(200).json({content: listings, response: 200});
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
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
