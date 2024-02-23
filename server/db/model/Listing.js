const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const listingSchema = new Schema({
  ownerID: {type: String, required: true, index: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true},
  imageURIs: {type: Array, required: false},
  condition: {type: String, required: false, index: true},
  extraField: {type: String, required: false, index: true},
  category: {type: String, required: true, index: true},
});

const carListingSchema = new Schema({
  ownerID: {type: String, required: true, index: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true},
  condition: {type: String, required: false, index: true},
  make: {type: String, required: true, index: true},
  model: {type: String, required: true, index: true},
  bodyType: {type: String, required: true, index: true},
  mileage: {type: Number, required: true},
  transmission: {type: String, required: true, index: true},
  driveTrain: {type: String, required: true, index: true},
  imageURIs: {type: Array, required: false},
});

const Listing = model('Listing', listingSchema);
const CarListing = model('CarListing', carListingSchema);

module.exports = { Listing, CarListing };
