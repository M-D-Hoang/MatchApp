/* eslint-disable no-console */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./model/User.js');
const { Listing, CarListing } = require('./model/Listing.js');

dotenv.config();
const dbUrl = process.env.ATLAS_URI;

let instance = null;

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

  async readAllFilteredListings(filter) {
    return await Listing.find(filter);
  }
  
  async readAllFilteredCarListings(filter) {
    return await CarListing.find(filter);
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
    return await User.updateOne(user.username, update);
  }
}

module.exports = DB;
