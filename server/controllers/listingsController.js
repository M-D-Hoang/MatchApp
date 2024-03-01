const asyncHandler = require('express-async-handler');
const DB = require('../db/db.js');
const db = new DB();

exports.getItems = asyncHandler(async (req, res) => {
  try {
    const listings = await db.readAllListings();
    res.status(200).json({ content: listings, response: 200 });
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

exports.getCars = asyncHandler(async (req, res) => {
  try {
    const carListings = await db.readAllCarListings();
    res.status(200).json({ content: carListings, response: 200 });
  } catch {
    res.status(500).send('Internal DB error. Could not read car listings');
  }
});

exports.getAll = asyncHandler(async (req, res) => {
  try {
    // get items and cars from the db
    const listings = await db.readAllListings();
    const carListings = await db.readAllCarListings();
    // combine them
    const combined = listings.concat(carListings);
    // TODO: sort them by date
    // send all listings
    res.status(200).json({ content: combined, response: 200 });
  } catch {
    res.status(500).send('Internal DB error. Could not read all listings');
  }
});


exports.postItem = asyncHandler(async (req, res) => {
  //console.log(req.body);
  //console.log(req.files);
  
  const formObj = req.body;
  try {

    //Upload images to blob & get URI here, append to body object
    formObj.imageURIs = [''];
    //TEMPORARY VALUE PLEASE CHANGE FOR THE FINAL!!!
    formObj.ownerID = 'user4633'; 
    //Add the listing to the DB
    await db.createListing(formObj);

    return res.status(201).send({ status: 201, content: formObj });
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400
    });
  }
});

exports.postCar = asyncHandler(async (req, res) => {
  //console.log(req.body);
  //console.log(req.files);
  
  const formObj = req.body;
  
  try {

    //Upload images to blob & get URI here, append to body object
    formObj.imageURIs = [''];
    //TEMPORARY VALUE PLEASE CHANGE FOR THE FINAL!!!
    formObj.ownerID = 'user4633';
    //Add the listing to the DB
    await db.createCarListing(formObj);

    return res.status(201).send({ status: 201, content: formObj });
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400
    });
  }
});

exports.editCar = asyncHandler(async (req, res) => {
  const carObj = req.body;
  try {
    //Update the listing in the DB
    await db.updateCarListing(carObj);
    return res.status(200).send({ status: 200, content: carObj });
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400
    });
  }
});

exports.getSingleItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const listing = await db.readOneItem(id);
    res.status(200).json({ content: listing, response: 200 });
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

exports.getSingleCar = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const carListing = await db.readOneCar(id);
    res.status(200).json({ content: carListing, response: 200 });
  } catch {
    res.status(500).send('Internal DB error. Could not read car listings');
  }
});




exports.getItemsFiltered = asyncHandler(async (req, res) => {
  try {
    const listings = await db.readAllListings();
    res.status(200).json({ content: listings, response: 200 });
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

exports.getCarsFiltered = asyncHandler(async (req, res) => {
  try {
    const carListings = await db.readAllCarListings();
    res.status(200).json({ content: carListings, response: 200 });
  } catch {
    res.status(500).send('Internal DB error. Could not read car listings');
  }
});