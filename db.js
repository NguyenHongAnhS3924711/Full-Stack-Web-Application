const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/Learning'; // Replace with your MongoDB URI

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

module.exports = mongoose;
