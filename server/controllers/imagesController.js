const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');
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

