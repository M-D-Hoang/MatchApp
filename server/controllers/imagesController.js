const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const { BlobServiceClient } = require('@azure/storage-blob');
const DB = require('../db/db.js');
const db = new DB();

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
  const images = Array.from(req.files.image);
  //   console.log(res.locals.listing);
  // create promises to upload images
  const uploadPromises = images.map(async (image, i) => {
    const path = image.name;
    const blobClient = containerClient.getBlockBlobClient(path);
    const options = {blobHTTPHeaders: {blobContentType: image.mimetype}};
    await blobClient.uploadData(image.data, options);
    const fullURL = blobPublicUrl + path;
    // Assign URL to the array.
    res.locals.listing.imageURIs[i] = fullURL; 
  });
  // Wait for all image upload promises to resolve.
  await Promise.all(uploadPromises);
  // update db row
  // check if car
  if (req.body.mileage){
    await db.updateCarListing(res.locals.listing);
  } else {
    await db.updateItemListing(res.locals.listing);
  }
  return res.status(201).json({ listing: res.locals.listing });
});
