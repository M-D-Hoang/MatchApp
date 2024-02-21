import express from 'express';
const listingsRouter = express.Router();
import DB from '../db/db.js';
const db = new DB();

listingsRouter.get('/items', async (req, res) => {
  try {
    const listings = await db.readAllListings();
    res.status(200).json({content: listings, response: 200});
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

listingsRouter.get('/cars', async (req, res) => {
  try {
    const carListings = await db.readAllCarListings();
    res.status(200).json({content: carListings, response: 200});
  } catch {
    res.status(500).send('Internal DB error. Could not read car listings');
  }
});

listingsRouter.get('/all', async (req, res) => {
  try {
    // get items and cars from the db
    const listings = await db.readAllListings();
    const carListings = await db.readAllCarListings();
    // combine them
    const combined = Array.from(listings, carListings);
    // TODO: sort them by date
    // send all listings
    res.status(200).json({content: combined, response: 200});
  } catch {
    res.status(500).send('Internal DB error. Could not read all listings');
  }
});

export default listingsRouter;
