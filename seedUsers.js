const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Adjust the path if necessary

// MongoDB URI
const dbURI = 'mongodb://localhost:27017/Learning'; // Replace with your MongoDB URI

// Sample users
const users = [
  {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    profilePicture: '/assets/images/defaultAvatar.png',
    password: 'password123'
  },
  {
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '0987654321',
    profilePicture: '/images/assets/defaultAvatar.png',
    password: 'password456'
  },
  {
    fullName: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phoneNumber: '1122334455',
    profilePicture: '/images/assets/defaultAvatar.png',
    password: 'password789'
  }
];

// Function to hash passwords
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function seedDB() {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});

    // Hash passwords and insert sample users
    const hashedUsers = await Promise.all(users.map(async user => {
      const hashedPassword = await hashPassword(user.password);
      return {
        ...user,
        password: hashedPassword
      };
    }));

    await User.insertMany(hashedUsers);
    console.log('Sample users added to database');

    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDB();
