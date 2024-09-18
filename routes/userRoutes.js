const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { fullName, email, phoneNumber, password, address, city, zipcode, country, accountType, schoolName, jobTitle, specialization } = req.body;

  try {
    // Check if a user already exists with the provided email or phone number
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }]
    });

    if (existingUser) {
      return res.status(400).render('register', { error: 'User already exists' });
    }
    
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
      city,
      zipcode,
      country,
      role: accountType,
      schoolName: accountType === 'instructor' ? schoolName : undefined,
      jobTitle: accountType === 'instructor' ? jobTitle : undefined,
      specialization: accountType === 'instructor' ? specialization.split(',') : undefined
    });

    // Save the new user to the database
    await newUser.save();

    // Redirect to the login page
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
