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
  console.log(req.body);
  console.log(req.files);

  //db is not implemented yet, for now, echo the body content
  try {
    //await db.addComment(req.body.name, req.body.comment, req.body.dateTime);

    return res.status(201).send({ status: 201, content: [req.body, req.files] });
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400
    });
  }
});

exports.postCar = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  //db is not implemented yet, for now, echo the body content
  try {
    //await db.addComment(req.body.name, req.body.comment, req.body.dateTime);

    return res.status(201).send({ status: 201, content: [req.body, req.files] });
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400
    });
  }
});

