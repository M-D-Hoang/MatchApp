const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const { BlobServiceClient } = require('@azure/storage-blob');
const DB = require('../db/db.js');
const db = new DB();
const sharp = require('sharp');

dotenv.config();
const AZURE_SAS = process.env.AZURE_SAS;
const containerName = 'fmpblob';
const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const blobPublicUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/`;
// Setup Azure Storage
const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${AZURE_SAS}`
);
// Get Container
const containerClient = blobService.getContainerClient(containerName);

exports.postImage = asyncHandler(async (req, res) => {
  let images = [];

  //check if any images, return 400 resp if not.
  if (req.files !== null){
    // if multiple images uploaded, it's an array
    // else it's an object
    if (req.files.image.length) {
      images = Array.from(req.files.image);
    } else {
      images.push(req.files.image);
    }
    const urls = [];
    // create promises to upload images
    const uploadPromises = images.map(async (image) => {
      await sharp(image.data).resize(1000).webp({quality: 80, nearLossless: true}).toBuffer().
        then(buffer => {
          image.data = buffer;
        });
      const path = image.name + '.webp';
      const blobClient = containerClient.getBlockBlobClient(path);
      const options = {blobHTTPHeaders: {blobContentType: 'image/webp'}};
      await blobClient.uploadData(image.data, options);
      const fullURL = blobPublicUrl + path;
      // add URL to the new array
      urls.push(fullURL);
    });
    // Wait for all image upload promises to resolve.
    await Promise.all(uploadPromises);
    // set new images urls
 
    if(res.locals.listing !== undefined){
      res.locals.listing.imageURIs = urls;
    }
    if(req.body.username !== undefined){
      //Set the image to the first uploaded image
      await db.updateUserImage(req.body.username, urls[0]);
      
    }
  }

  // update db row
  // check if car / user
  if(req.body.username !== undefined){
    //Return the same obj
    return res.status(201).json({ listing: res.locals.listing });
  } else if (req.body.mileage){
    await db.updateCarListing(res.locals.listing);
  } else {
    await db.updateItemListing(res.locals.listing);
  }
  return res.status(201).json({ listing: res.locals.listing, id: res.locals.listing._id });
});
