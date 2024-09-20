const express = require('express');
const Course = require('../models/course'); // Adjust the path if necessary
const router = express.Router();

// Route to browse courses by name
router.get('/browse/name', async (req, res) => {
  try {
    const courses = await Course.find().sort({ courseName: 1 }); // Sort courses by name
    res.render('browse-name', { courses }); // Render the view with sorted courses
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send('Error fetching courses');
  }
});

// Route to browse courses by category
router.get('/browse/category', async (req, res) => {
  try {
    const courses = await Course.find(); // Get all courses
    const groupedCourses = courses.reduce((acc, course) => {
      course.categories.forEach(category => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(course);
      });
      return acc;
    }, {});
    res.render('browse-category', { groupedCourses }); // Render the view with grouped courses
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send('Error fetching courses');
  }
});

module.exports = router;
