const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  sellerID: {type: String, required: true, index: true},
  buyerID: {type: String, required: true, index: true},
  listingID: {type: String, required: true, index: true},
  listingURL: {type:String, required:true, index:true},
  message: {type: String, required: true},
  itemImage: {type: String, required: true},
});

const Message = model('Message', messageSchema);
module.exports = Message;