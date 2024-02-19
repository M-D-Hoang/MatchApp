//Uploader deps
import * as dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import DB from '../db/db.js';
//Azure stuff
import { BlobServiceClient } from '@azure/storage-blob';

export const imageUploadRouter = express.Router();

dotenv.config();
const AZURE_SAS = process.env.AZURE_SAS;
const containerName = 'pfpstorage';
const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || 'azuretestdpomerantz';
const blobPublicUrl = 'https://520pocprofiles.blob.core.windows.net/pfpstorage/';
//Setup Azure Storage
const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${AZURE_SAS}`
);
//Get Container
const containerClient = blobService.getContainerClient(containerName);

//DB Setup
const db = new DB();

    
imageUploadRouter.use(
  //docs: https://www.npmjs.com/package/express-fileupload
  fileUpload({
    createParentPath: true,
  })
);

imageUploadRouter.post('/image', async (req, res) =>{

  //env check
  if(AZURE_SAS === undefined || storageAccountName === undefined){
    res.status(500).json({
      content:'Environment Variables Not Set.',
      status:500
    });
  }

  try{
    // eslint-disable-next-line no-console
    console.log(req.body);
    const file = req.files.pfp;
    //should have validation eventually
    const username = req.body.user; 
    //process image
    const path = `${username}`;

    const blobClient = containerClient.getBlockBlobClient(path);

    //set mimetype as determined from browser w/file upload control
    const options = {blobHTTPHeaders: {blobContentType: file.mimetype}};
    await blobClient.uploadData(file.data, options);
    //Change DB user to use the new PFP
    const fullURL = blobPublicUrl + path;
   
    await db.updateUserImage(username, fullURL);

    return res.status(201).send({status:201, path:path, fullUrl: fullURL});

  } catch(e){
    res.status = 400;
    res.json({
      content:e.message,
      status:400
    });
  }

});

imageUploadRouter.use('/image', (req, res)=>{
  res.status = 400;
  res.json({
    content:'Bad request. Send a POST request to this URL.',
    status:400
  });
});


imageUploadRouter.use('/', (req, res)=>{
  res.status = 404;
  res.json({
    content:'URL Not found.',
    status:404
  });
});