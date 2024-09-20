const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/Learning'; // Replace with your MongoDB URI

async function connectToDatabase() {
  try {
      await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
  } catch (err) {
      console.error('MongoDB connection error:', err);
  }
}

connectToDatabase();

module.exports = mongoose;
