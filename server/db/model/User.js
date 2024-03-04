const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true},
  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  birthday: {type: String, required: false},
  gender: {type: String, required: false},
  email: {type: String, required: false},
  phoneNumber: {type: String, required: false},
  picture: {type: String, required: false},
  type: {type: String, required: true},
});

const User = model('User', userSchema);
module.exports = User;