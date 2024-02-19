import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './model/User.js';

dotenv.config();
const dbUrl = process.env.ATLAS_URI;

let instance = null;

export default class DB {
  constructor() {
    //instance is the singleton, defined in outer scope
    if (!instance){
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

  async readAllUsers() {
    const users = await User.find();
    return users;
  }

  async updateUserImage(username, imageURL){
    //get user and update their pfp
    //if doesn't exist, make a new one
    console.log('Doing update');
    const update = { $set: {picture: imageURL} };
    await User.findOneAndUpdate({name:username}, update, {
      upsert:true
    });
  }

  async createUser(user) {
    const formattedComments = user.comments.map(comment => ({
      text: comment.text,
      time: comment.time
    }));
    
    const userRow = new User({
      name: user.name,
      comments: formattedComments,
      picture: user.picture
    });
    
    await userRow.save();
  }

  // BROKEN FOR NOW
  async createManyUsers(users) {
    const userRows = [];
    // make mongoose User objects
    users.forEach(user => {
      userRows.push(new User({
        name: user.name,
        comments: user.comments,
        picture: user.picture
      }));
    });
    // save each object to DB
    userRows.forEach(async (userRow) => {
      await userRow.save();
    });
  }

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
}