const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');

// Route to fetch instructors and courses
router.get('/home', async (req, res) => {
  try {
    // Fetch newly added instructors (limit to 5, for example)
    const newInstructors = await User.find({ role: 'instructor' })
      .sort({ createdAt: -1 })
      .limit(5);

    // Fetch newly launched courses (limit to 5)
    const newCourses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Fetch featured instructors (you can define your own criteria)
    const featuredInstructors = await User.find({ role: 'instructor', featured: true })
      .limit(5);

    // Fetch featured courses (you can define your own criteria)
    const featuredCourses = await Course.find({ featured: true })
      .limit(5);

    // Render the view with fetched data
    res.render('home', {
      newInstructors,
      newCourses,
      featuredInstructors,
      featuredCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
