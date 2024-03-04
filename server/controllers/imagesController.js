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
  // TODO: support for multiple images
  const image = req.files.image[0];
  // set filename
  const path = image.name;
  const blobClient = containerClient.getBlockBlobClient(path);
  // set mimetype as determined from browser w/file upload control
  const options = {blobHTTPHeaders: {blobContentType: image.mimetype}};
  // upload to blob storage
  await blobClient.uploadData(image.data, options);
  const fullURL = blobPublicUrl + path;
  // TODO: support for multiple images
  res.locals.listing.imageURIs[0] = fullURL;
  // update db row
  await db.updateItemListing(res.locals.listing);
  return res.status(201).json({ path:path, fullUrl: fullURL });
});