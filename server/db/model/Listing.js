import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const listingSchema = new Schema({
  ownerID: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true},
  imageURIs: {type: Array, required: false},
  condition: {type: String, required: false},
  extraField: {type: String, required: false},
  category: {type: String, required: true}
});

const carListingSchema = new Schema({
  ownerID: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true},
  condition: {type: String, required: false},
  make: {type: String, required: true},
  model: {type: String, required: true},
  bodyType: {type: String, required: true},
  mileage: {type: Number, required: true},
  transmission: {type: String, required: true},
  driveTrain: {type: String, required: true},
  imageURIs: {type: Array, required: false},
});

export const Listing = model('Listing', listingSchema);
export const CarListing = model('CarListing', carListingSchema);
