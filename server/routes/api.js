import express from 'express';
import {imageUploadRouter} from './imageUpload.js';
const helloRouter = express.Router();
import DB from '../db/db.js';
const db = new DB();

/*
helloRouter.use('/users', async (req, res)=>{
  //res.json({content:userData, response:200});

  try{
    const users = await db.readAllUsers();
    res.status(200).json({content:users, response:200});
  } catch{
    res.status(500).send('Internal DB error');
  }

});


helloRouter.use('/helloworld', (req, res)=>{
  res.json({
    content:'hello world!',
    'response':200
  });
});

helloRouter.use('/upload', imageUploadRouter);

helloRouter.post('/comment', async (req, res) => {
  console.log(req.body);
  try {
    await db.addComment(req.body.name, req.body.comment, req.body.dateTime);
    // await db.addComment('23', 'sdsdd');
    return res.status(200).send({status:201, name:req.body.name, comment: req.body.comment});
  } catch (e) {
    res.status = 400;
    res.json({
      content:e.message,
      status:400
    });
  }

});
*/

helloRouter.post('/listing', async (req, res) => {
  console.log(req.body);
  //db is not implemented yet, for now, echo the body content
  try {
    //await db.addComment(req.body.name, req.body.comment, req.body.dateTime);
   
    return res.status(200).send({status:201, content:req.body});
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


//module.exports = helloRouter;
export default helloRouter;
