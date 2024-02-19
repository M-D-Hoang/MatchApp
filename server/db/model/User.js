import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  text: String,
  time: String,
});

const userSchema = new Schema({
  name: String,
  comments: [commentSchema],
  picture: String,
});
const User = model('User', userSchema);
export default User;