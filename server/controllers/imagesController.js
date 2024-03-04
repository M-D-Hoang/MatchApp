const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const { BlobServiceClient } = require('@azure/storage-blob');

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
//   const data = req.body;
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
  // TODO: update db row with image url
  //await db.updateItem(data.title);
  return res.status(201).json({ path:path, fullUrl: fullURL });
});