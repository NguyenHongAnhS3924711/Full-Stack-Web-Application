const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Adjust the path if necessary

// MongoDB URI
const dbURI = 'mongodb://localhost:27017/Learning'; // Replace with your MongoDB URI

// Sample users without profile images
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
  // 6 Instructors
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
  {
    fullName: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phoneNumber: '2223334444',
    password: 'securepassword6',
    address: '123 Cedar Lane',
    city: 'Springfield',
    zipcode: '44567',
    country: 'USA',
    role: 'instructor',
    schoolName: 'Springfield College',
    jobTitle: 'Lecturer',
    specialization: ['Physics', 'Chemistry'],
    courses: ['Introduction to Quantum Mechanics', 'Organic Chemistry'] // Example courses
  },
  {
    fullName: 'Ethan Walker',
    email: 'ethan.walker@example.com',
    phoneNumber: '3334445555',
    password: 'securepassword7',
    address: '987 Willow Road',
    city: 'Springfield',
    zipcode: '55678',
    country: 'USA',
    role: 'instructor',
    schoolName: 'Springfield University',
    jobTitle: 'Assistant Professor',
    specialization: ['Computer Science', 'Engineering'],
    courses: ['Data Structures and Algorithms', 'Introduction to Robotics'] // Example courses
  },
  {
    fullName: 'Grace Martinez',
    email: 'grace.martinez@example.com',
    phoneNumber: '4445556666',
    password: 'securepassword8',
    address: '321 Pine Avenue',
    city: 'Springfield',
    zipcode: '66789',
    country: 'USA',
    role: 'instructor',
    schoolName: 'Springfield Technical Institute',
    jobTitle: 'Instructor',
    specialization: ['Mechanical Engineering', 'Robotics'],
    courses: ['Advanced Mechanics', 'Introduction to Automation'] // Example courses
  },
  {
    fullName: 'Henry Wilson',
    email: 'henry.wilson@example.com',
    phoneNumber: '5556667777',
    password: 'securepassword9',
    address: '654 Maple Drive',
    city: 'Springfield',
    zipcode: '77890',
    country: 'USA',
    role: 'instructor',
    schoolName: 'Springfield Academy',
    jobTitle: 'Senior Lecturer',
    specialization: ['Biology', 'Environmental Science'],
    courses: ['Ecology', 'Marine Biology'] // Example courses
  },
  // 3 Normal Users
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
  },
  {
    fullName: 'Daniel Lee',
    email: 'daniel.lee@example.com',
    phoneNumber: '2233445566',
    password: 'securepassword4',
    address: '101 Maple Street',
    city: 'Springfield',
    zipcode: '44556',
    country: 'USA',
    role: 'user'
  },
  {
    fullName: 'Laura Thompson',
    email: 'laura.thompson@example.com',
    phoneNumber: '3344556677',
    password: 'securepassword10',
    address: '456 Oak Drive',
    city: 'Springfield',
    zipcode: '55667',
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
