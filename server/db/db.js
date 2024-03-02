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
    await listingRow.save();
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
    await listingRow.save();
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

  // // BROKEN FOR NOW
  // async createManyUsers(users) {
  //   const userRows = [];
  //   // make mongoose User objects
  //   users.forEach(user => {
  //     userRows.push(new User({
  //       name: user.name,
  //       comments: user.comments,
  //       picture: user.picture
  //     }));
  //   });
  //   // save each object to DB
  //   userRows.forEach(async (userRow) => {
  //     await userRow.save();
  //   });
  // }

  //add a comment to user's comments array,
  //if user not, exist, makes new user
  //need to be tested
  async addComment(user, comment, time) {
    const update = {
      $push: {
        comments: {
          text: comment,
          time: time,
        },
      },
    };

    await User.findOneAndUpdate({ name: user }, update, {
      upsert: true,
    });
  }


  async removeListingByID(id){
    return await Listing.deleteOne({ _id: id});
  }

  async removeCarByID(id){
    return await CarListing.deleteOne({ _id: id});
  }
  
  async updateItemListing(listing) {
    const update = { $set: listing };
    return await Listing.findByIdAndUpdate(listing.id, update);

  }
}

module.exports = DB;
