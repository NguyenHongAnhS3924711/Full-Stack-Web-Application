const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  profilePicture: String,
  password: { type: String, required: true }
}, { collection: 'Users' }); // Specify your custom collection name here

const User = mongoose.model('User', userSchema);

module.exports = User;