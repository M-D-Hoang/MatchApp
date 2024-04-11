/* eslint-disable no-console */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./model/User.js');
const Message = require('./model/Message.js');
const { Listing, CarListing } = require('./model/Listing.js');

dotenv.config();
const dbUrl = process.env.ATLAS_URI;
let instance = null;
const ITEMS_PER_PAGE = 52;

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

  /**
   * A function that reads all filtered listings based on provided filters, 
   * page, sort field, and sort order.
   *
   * @param {Object} filter - The filter object to apply to the listings.
   * @param {number} [page=1] - The page number to retrieve.
   * @param {string} [sortField='date'] - The field to sort the listings by.
   * @param {string} [sortOrder='desc'] - The order in which to sort the listings ('asc' or 'desc').
   * @return {Promise<Array>} An array of filtered and paginated listings.
   */
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
  
  /**
   * A function to read all filtered car listings.
   *
   * @param {Object} filter - The filter object to apply to the car listings.
   * @param {number} [page=1] - The page number to display, default is 1.
   * @param {string} [sortField='date'] - The field to use for sorting, default is 'date'.
   * @param {string} [sortOrder='desc'] - The order to sort by, default is 'desc'.
   * @return {Promise<Array>} A promise that resolves to an array of car listings.
   */
  async readAllFilteredCarListings(filter, page = 1, sortField = 'date', sortOrder = 'desc') {
    const skipItems = (page - 1) * ITEMS_PER_PAGE;
    const validSortOrder = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';
    const sortObject = {};
    // TODO MAKE SURE ONLY PRICE OR DATE
    sortObject[sortField] = validSortOrder;
    return await CarListing.find(filter).
      sort(sortObject).
      skip(skipItems).
      limit(ITEMS_PER_PAGE);
  }

  /**
   * Retrieves all listings from the database.
   *
   * @return {Promise<Array>} An array of all listings retrieved from the database.
   */
  async readAllListings() {
    return await Listing.find();
  }
  
  /**
   * A description of the entire function.
   *
   * @return {Promise<CarListing[]>} description of return value
   */
  async readAllCarListings() {
    return await CarListing.find();
  }

  /**
   * Asynchronously creates a new listing.
   *
   * @param {Object} listing - The listing object containing ownerID, title, description, price, 
   * imageURIs, condition, extraField, category, date, location, coordinates, and objectType.
   * @return {Promise} A promise that resolves to the saved listing row.
   */
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
      coordinates: listing.coordinates,
      objectType: listing.objectType
    });
    return await listingRow.save();
  }

  /**
   * Creates a new car listing in the database.
   *
   * @param {Object} listing - The details of the car listing to be created.
   * @return {Promise} A promise that resolves with the saved car listing object.
   */
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
      coordinates: listing.coordinates,
      objectType: listing.objectType
    });
    return await listingRow.save();
  }

  /**
   * A function to update the user image.
   *
   * @param {string} username - the username of the user
   * @param {string} imageURL - the URL of the new image
   * @return {Promise} a Promise indicating the completion of the update
   */
  async updateUserImage(username, imageURL) {
    //get user and update their pfp
    //if doesn't exist, make a new one
    console.log('Doing update');
    const update = { $set: { picture: imageURL } };
    await User.findOneAndUpdate({ username: username }, update, {
      upsert: true,
    });
  }

  /**
   * Creates a new user in the database.
   *
   * @param {object} user - The user object containing user details
   * @return {Promise<void>} A promise that resolves once the user is successfully saved
   */
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

  /**
   * async readOneCar - Read a car by its ID
   *
   * @param {type} id - The ID of the car to read
   * @return {type} The car listing with the specified ID
   */
  async readOneCar(id) {
    return await CarListing.findById(id);
  }

  /**
   * Retrieves a single item by its ID using async operation.
   *
   * @param {type} id - the ID of the item to retrieve
   * @return {type} the item with the specified ID
   */
  async readOneItem(id) {
    return await Listing.findById(id);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} id - description of parameter
   * @return {type} description of return value
   */
  async removeListingByID(id){
    return await Listing.deleteOne({ _id: id});
  }

  /**
   * A description of the entire function.
   *
   * @param {type} id - description of parameter
   * @return {Promise} description of return value
   */
  async removeCarByID(id){
    return await CarListing.deleteOne({ _id: id});
  }
  
  /**
   * Update an item listing in the database.
   *
   * @param {Object} listing - The item listing to be updated
   * @return {Promise} A Promise that resolves to the updated item listing
   */
  async updateItemListing(listing) {
    const update = { $set: listing };
    return await Listing.findByIdAndUpdate(
      listing.id ? listing.id : listing._id.toString(), update
    );
  }

  /**
   * Update a car listing in the database.
   *
   * @param {Object} listing - The updated car listing object.
   * @return {Promise} A promise that resolves to the updated car listing.
   */
  async updateCarListing(listing) {
    const update = { $set: listing };
    return await CarListing.findByIdAndUpdate(
      listing.id ? listing.id : listing._id.toString(), update
    );
  }

  /**
   * Retrieves a user from the database by their username.
   *
   * @param {string} username - The username of the user to retrieve.
   * @return {Promise<User>} A Promise that resolves to the user found in the database.
   */
  async readUser(username) {
    return await User.findOne(username);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} user - description of parameter
   * @return {type} description of return value
   */
  async updateUser(user) {
    const update = { 
      username: user.username, 
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,  
      gender: user.gender,  
      email: user.email,
      phoneNumber: user.phoneNumber,
      picture: user.picture,
      type: user.type
    };
    const options = { 
      upsert: true,
      new: true,
    };
    return await User.findOneAndUpdate({ username: user.username }, update, options);
  }

  /**
   * Retrieves items from a user.
   *
   * @param {string} username - The username of the user
   * @return {Promise<Array>} Promise that resolves to an array of items
   */
  async getItemsFromUser(username) {
    return await Listing.find({ ownerID: username });
  }

  /**
   * Retrieves messages from a specific user.
   *
   * @param {string} username - The username of the user
   * @return {Array} An array of messages sorted by creation date
   */
  async getMessagesFromUser(username) {
    return await Message.find({ sellerID: username }).sort({ createdAt: -1 });
  }

  /**
   * Create a new message in the database.
   *
   * @param {Object} message - The message object containing sellerID, buyerID, 
   * listingID, message, and itemImage.
   * @return {Promise} Returns a Promise that resolves to the saved message.
   */
  async createMessage(message) {
    const messageRow = new Message({
      sellerID: message.sellerID,
      buyerID: message.buyerID,
      listingID: message.listingID,
      listingURL: message.listingURL,
      message: message.message,
      itemImage: message.itemImage,
    });

    return await messageRow.save();
  } 

  /**
   * A description of the entire function.
   *
   * @param {type} id - description of parameter
   * @return {type} description of return value
   */
  async removeMessageByID(id) {
    return await Message.deleteOne({ _id: id});
  }
}

module.exports = DB;
