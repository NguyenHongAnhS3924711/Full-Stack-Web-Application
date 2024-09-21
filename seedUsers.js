const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

// MongoDB URI
const dbURI = 'mongodb://localhost:27017/Learning';

// Sample users
const users = [
  // 1 Admin
  {
    fullName: 'Emily Davis',
    email: 'emily.davis@example.com',
    phoneNumber: '1234567891',
    password: 'securepassword1',
    address: '123 Elm Street',
    city: 'Springfield',
    zipcode: '12345',
    country: 'USA',
    role: 'admin' // Assigning role as admin
  },
  // 2 Instructors
  {
    fullName: 'Michael Brown',
    email: 'michael.brown@example.com',
    phoneNumber: '0987654322',
    password: 'securepassword2',
    address: '456 Oak Avenue',
    city: 'Springfield',
    zipcode: '67890',
    country: 'USA',
    role: 'instructor',
    schoolName: 'Springfield University',
    jobTitle: 'Professor',
    specialization: ['Math', 'Science'],
    courses: ['Algebra 101', 'Physics for Engineers'] // Example courses
  },
  {
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    phoneNumber: '1112223333',
    password: 'securepassword5',
    address: '789 Birch Road',
    city: 'Springfield',
    zipcode: '33456',
    country: 'USA',
    role: 'instructor',
    schoolName: 'Springfield High School',
    jobTitle: 'Teacher',
    specialization: ['History', 'Geography'],
    courses: ['World History', 'Geography of the Americas'] // Example courses
  },
  // 1 Normal Users
  {
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phoneNumber: '1122334466',
    password: 'securepassword3',
    address: '789 Pine Road',
    city: 'Springfield',
    zipcode: '11223',
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
    console.log('Sample users without profile images added to database');

    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDB();
