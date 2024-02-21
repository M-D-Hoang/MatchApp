import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './model/User.js';
import { Listing, CarListing } from './model/Listing.js';

dotenv.config();
const dbUrl = process.env.ATLAS_URI;

let instance = null;

export default class DB {
  constructor() {
    //instance is the singleton, defined in outer scope
    if (!instance){
      instance = this;
      if (dbUrl) {
        mongoose.connect(dbUrl);
        console.log('Successfully conected to the DB');
      } else {
        console.log('Not connecting to DB, no dbURL provided');
      }
    }
    return instance;
  }

  async readAllListings(){
    return await Listing.find().sort({ datePosted: -1 });
  }

  async readAllCarListings(){
    return await CarListing.find().sort({ datePosted: -1 });
  }

  async createListing(listing){
    const listingRow = new Listing({
      ownerID: listing.ownerID,
      title: listing.title,
      datePosted: Date.now(),
      description: listing.description,
      price: listing.price,
      imageURIs: listing.imageURIs,
      condition: listing.condition,
      extraField: listing.extraField,
      category: listing.category
    });
    await listingRow.save();
  }

  async createCarListing(listing){
    const listingRow = new Listing({
      ownerID: listing.ownerID,
      title: listing.title,
      datePosted: Date.now(),
      description: listing.description,
      price: listing.price,
      condition: listing.condition,
      make: listing.extraField,
      model: listing.model,
      bodyType: listing.bodyType,
      mileage: listing.mileage,
      transmission: listing.transmission,
      imageURIs: listing.imageURIs
    });
    await listingRow.save();
  }

  async updateUserImage(username, imageURL){
    //get user and update their pfp
    //if doesn't exist, make a new one
    console.log('Doing update');
    const update = { $set: {picture: imageURL} };
    await User.findOneAndUpdate({name:username}, update, {
      upsert:true
    });
  }
}
