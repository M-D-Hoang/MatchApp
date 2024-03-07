/* eslint-disable no-console */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./model/User.js');
const { Listing, CarListing } = require('./model/Listing.js');

dotenv.config();
const dbUrl = process.env.ATLAS_URI;
let instance = null;
const ITEMS_PER_PAGE = 50;

class DB {
  constructor() {
    //instance is the singleton, defined in outer scope
    if (!instance) {
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

  async readAllFilteredListings(filter, page = 1, sortField = 'date', sortOrder = 'desc') {
    const skipItems = (page - 1) * ITEMS_PER_PAGE;
    const validSortOrder = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';
    const sortObject = {};
    // TODO MAKE SURE ONLY PRICE OR DATE
    sortObject[sortField] = validSortOrder;
    return await Listing.find(filter).
      sort(sortObject).
      skip(skipItems).
      limit(ITEMS_PER_PAGE);
  }
  
  async readAllFilteredCarListings(filter, page = 1, sortField = 'date', sortOrder = 'desc') {
    const skipItems = (page - 1) * ITEMS_PER_PAGE;
    const validSortOrder = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';
    const sortObject = {};
    // TODO MAKE SURE ONLY PRICE OR DATE
    sortObject[sortField] = validSortOrder;
    return (await CarListing.find(filter)).
      sort(sortObject).
      skip(skipItems).
      limit(ITEMS_PER_PAGE);
  }

  async readAllListings() {
    return await Listing.find();
  }
  
  async readAllCarListings() {
    return await CarListing.find();
  }

  async createListing(listing) {
    const listingRow = new Listing({
      ownerID: listing.ownerID,
      title: listing.title,
      description: listing.description,
      price: listing.price,
      imageURIs: listing.imageURIs,
      condition: listing.condition,
      extraField: listing.extraField,
      category: listing.category,
      date: listing.date,
      location: listing.location,
      objectType: listing.objectType
    });
    return await listingRow.save();
  }

  async createCarListing(listing) {
    const listingRow = new CarListing({
      ownerID: listing.ownerID,
      title: listing.title,
      description: listing.description,
      price: listing.price,
      condition: listing.condition,
      make: listing.make,
      model: listing.model,
      bodyType: listing.bodyType,
      mileage: listing.mileage,
      transmission: listing.transmission,
      driveTrain: listing.driveTrain,
      imageURIs: listing.imageURIs,
      date: listing.date,
      location: listing.location,
      objectType: listing.objectType
    });
    return await listingRow.save();
  }

  async updateUserImage(username, imageURL) {
    //get user and update their pfp
    //if doesn't exist, make a new one
    console.log('Doing update');
    const update = { $set: { picture: imageURL } };
    await User.findOneAndUpdate({ name: username }, update, {
      upsert: true,
    });
  }

  async createUser(user) {
    const userRow = new User({
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      gender: user.gender,
      email: user.email,
      phoneNumber: user.phoneNumber,
      picture: user.picture,
      type: user.type,
    });

    await userRow.save();
  }

  async readOneCar(id) {
    return await CarListing.findById(id);
  }

  async readOneItem(id) {
    return await Listing.findById(id);
  }


  async removeListingByID(id){
    return await Listing.deleteOne({ _id: id});
  }

  async removeCarByID(id){
    return await CarListing.deleteOne({ _id: id});
  }
  
  async updateItemListing(listing) {
    const update = { $set: listing };
    return await Listing.findByIdAndUpdate(
      listing.id ? listing.id : listing._id.toString(), update
    );
  }

  async updateCarListing(listing) {
    const update = { $set: listing };
    return await CarListing.findByIdAndUpdate(
      listing.id ? listing.id : listing._id.toString(), update
    );
  }

  async readUser(username) {
    return await User.findOne(username);
  }

  async updateUser(user) {
    const update = { $set: user };
    const options = { upsert: true };
    return await User.findOneAndUpdate({ username: user.username }, update, options);
  }
  

  async getItemsFromUser(username) {
    return await Listing.find({ ownerID: username });
  }
}

module.exports = DB;
