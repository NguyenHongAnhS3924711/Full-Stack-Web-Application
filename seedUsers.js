const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Adjust the path if necessary

// MongoDB URI
const dbURI = 'mongodb://localhost:27017/Learning'; // Replace with your MongoDB URI

// Sample users with updated schema
const users = [
  {
    fullName: 'Emily Davis',
    email: 'emily.davis@example.com',
    phoneNumber: '1234567891',
    profilePicture: '/assets/images/emilyAvatar.png',
    password: 'securepassword1',
    address: '123 Elm Street',
    city: 'Springfield',
    zipcode: '12345',
    country: 'USA',
    role: 'admin' // Assigning role as admin
  },
  {
    fullName: 'Michael Brown',
    email: 'michael.brown@example.com',
    phoneNumber: '0987654322',
    profilePicture: '/assets/images/michaelAvatar.png',
    password: 'securepassword2',
    address: '456 Oak Avenue',
    city: 'Springfield',
    zipcode: '67890',
    country: 'USA',
    role: 'instructor',
    schoolName: 'Springfield University',
    jobTitle: 'Professor',
    specialization: ['Math', 'Science'] // Assuming specialization is an array
  },
  {
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phoneNumber: '1122334466',
    profilePicture: '/assets/images/sarahAvatar.png',
    password: 'securepassword3',
    address: '789 Pine Road',
    city: 'Springfield',
    zipcode: '11223',
    country: 'USA',
    role: 'user'
  },
  {
    fullName: 'Daniel Lee',
    email: 'daniel.lee@example.com',
    phoneNumber: '2233445566',
    profilePicture: '/assets/images/danielAvatar.png',
    password: 'securepassword4',
    address: '101 Maple Street',
    city: 'Springfield',
    zipcode: '44556',
    country: 'USA',
    role: 'user'
  }
];

// Function to hash passwords
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function seedDB() {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
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
    console.log('Sample users with updated schema added to database');

    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDB();
