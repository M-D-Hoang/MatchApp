const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: false},
  name: {type: String, required: true},
  birthday: {type: String, required: false},
  gender: {type: String, required: false},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: false},
  picture: {type: String, required: true},
  type: {type: String, required: false},
});

const User = model('User', userSchema);
module.exports = User;