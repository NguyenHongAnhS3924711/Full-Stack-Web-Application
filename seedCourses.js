const mongoose = require('mongoose');
const Course = require('./models/course'); // Adjust the path if necessary

// MongoDB URI
const dbURI = 'mongodb://localhost:27017/Learning'; // Replace with your MongoDB URI

// Sample courses with categories
const courses = [
  {
    courseName: 'Introduction to Programming',
    price: 199.99,
    description: 'Learn the fundamentals of programming using Python. Ideal for beginners.',
    categories: ['Programming', 'Python'], // Add categories
    createdAt: new Date()
  },
  {
    courseName: 'Web Development Bootcamp',
    price: 299.99,
    description: 'A comprehensive bootcamp covering HTML, CSS, JavaScript, and more.',
    categories: ['Web Development', 'HTML', 'CSS', 'JavaScript'], // Add categories
    createdAt: new Date()
  },
  {
    courseName: 'Data Science Essentials',
    price: 249.99,
    description: 'An introduction to data science concepts and tools, including Python and R.',
    categories: ['Data Science', 'Python', 'R'], // Add categories
    createdAt: new Date()
  },
  {
    courseName: 'Advanced Machine Learning',
    price: 349.99,
    description: 'Deep dive into machine learning algorithms and their applications.',
    categories: ['Machine Learning', 'AI'], // Add categories
    createdAt: new Date()
  },
  {
    courseName: 'Cybersecurity Fundamentals',
    price: 199.99,
    description: 'Learn about the basic concepts of cybersecurity and how to protect systems.',
    categories: ['Cybersecurity'], // Add categories
    createdAt: new Date()
  },
  {
    courseName: 'Mobile App Development',
    price: 299.99,
    description: 'Create your first mobile application using React Native.',
    categories: ['Mobile Development', 'React Native'], // Add categories
    createdAt: new Date()
  }
];

// Function to insert courses into the database
async function seedCourses() {
    try {
      await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
  
      // Clear existing courses
      await Course.deleteMany({});
  
      // Insert sample courses
      await Course.insertMany(courses);
      console.log('Sample courses added to database');
  
      mongoose.disconnect();
    } catch (err) {
      console.error('Error seeding courses:', err);
    }
}
  
// Call the function
seedCourses();
