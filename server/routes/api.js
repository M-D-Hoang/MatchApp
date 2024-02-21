import express from 'express';
import {imageUploadRouter} from './imageUpload.js';
const helloRouter = express.Router();
import DB from '../db/db.js';
const db = new DB();
import fileUpload from 'express-fileupload';



imageUploadRouter.use(
  //docs: https://www.npmjs.com/package/express-fileupload
  fileUpload({
    createParentPath: true,
  })
);


helloRouter.post('/listing', async (req, res) => {
  console.log(req.body);
  console.log(req.files);

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
