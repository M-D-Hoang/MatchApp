const asyncHandler = require('express-async-handler');
const DB = require('../db/db.js');
const db = new DB();

exports.getItems = asyncHandler(async (req, res) => {
  try {
    const listings = await db.readAllListings();
    res.status(200).json(listings);
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

exports.getCars = asyncHandler(async (req, res) => {
  try {
    const carListings = await db.readAllCarListings();
    res.status(200).json(carListings);
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
    // TODO: location
    // send all listings
    res.status(200).json(combined);
  } catch {
    res.status(500).send('Internal DB error. Could not read all listings');
  }
});

exports.postItem = asyncHandler(async (req, res, next) => {
  const formObj = req.body;
  try {
    // imageURIs empty, imageUploader will update the field next
    formObj.imageURIs = [''];
    // TODO: TEMPORARY VALUE PLEASE CHANGE FOR THE FINAL!!!
    formObj.ownerID = 'user4633'; 
    // Add the listing to the DB
    res.locals.listing = await db.createListing(formObj);
    // pass request to the next middleware (image uploader)
    next();
    //return res.status(201).send({ status: 201, content: formObj });
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400
    });
  }
});

exports.postCar = asyncHandler(async (req, res, next) => {
  const formObj = req.body;
  try {
    // imageURIs empty, imageUploader will update the field next
    formObj.imageURIs = [''];
    // TODO: TEMPORARY VALUE PLEASE CHANGE FOR THE FINAL!!!
    formObj.ownerID = 'user4633';
    // Add the listing to the DB
    res.locals.listing = await db.createCarListing(formObj);
    // pass request to the next middleware (image uploader)
    next();
    //return res.status(201).send({ status: 201, content: formObj });
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400
    });
  }
});
  
exports.deleteItem = asyncHandler(async (req, res) => {
  //Needs to check if user is the owner of the item
  const itemID = req.body._id;
  
  try {
    await db.removeListingByID(itemID);
    
    return res.status(204).json('Item Deleted');
  } catch (e) {
    res.status(400).json({
      content: e.message,
      status: 400
    });
  }
});

exports.deleteCar = asyncHandler(async (req, res) => {
  //Needs to check if user is the owner of the item
  const itemID = req.body._id;
  
  try {
    await db.removeCarByID(itemID);
    
    return res.status(204).json('Item Deleted');
  } catch (e) {
    res.status(400).json({
      content: e.message,
      status: 400
    });
  }
});

exports.editCar = asyncHandler(async (req, res) => {
  const carObj = req.body;
  try {
    const mongoRes = await db.updateCarListing(carObj);
    return res.status(201).send(mongoRes);
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,
    });
  }
});

exports.editItem = asyncHandler(async (req, res) => {
  const ItemObj = req.body;
  try {
    const mongoRes = await db.updateItemListing(ItemObj);
    return res.status(201).send(mongoRes);
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,

    });
  }
});

exports.getSingleItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const listing = await db.readOneItem(id);
    res.status(200).json(listing);
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

exports.getSingleCar = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const carListing = await db.readOneCar(id);
    res.status(200).json(carListing);
  } catch {
    res.status(500).send('Internal DB error. Could not read car listings');
  }
});

exports.getItemsFiltered = asyncHandler(async (req, res) => {
  try {
    const { condition, extraField, category } = req.query;

    const filter = {};
    if (condition) {
      filter.condition = condition;
    }
    if (extraField) {
      filter.extraField = extraField;
    }
    if (category) {
      filter.category = category;
    }
    const listings = await db.readAllFilteredListings(filter);
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

exports.getCarsFiltered = asyncHandler(async (req, res) => {
  try {
    const { condition, make, model, bodyType, transmission, driveTrain } = req.query;

    const filter = {};
    if (condition) {
      filter.condition = condition;
    }
    if (make) {
      filter.make = make;
    }
    if (model) {
      filter.model = model;
    }
    if (bodyType) {
      filter.bodyType = bodyType;
    }
    if (transmission) {
      filter.transmission = transmission;
    }
    if (driveTrain) {
      filter.driveTrain = driveTrain;
    }
    const carListings = await db.readAllFilteredCarListings(filter);
    res.status(200).json(carListings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal DB error. Could not read car listings');
  }
});
