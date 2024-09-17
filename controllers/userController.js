const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }]
    });

    if (existingUser) {
      return res.status(400).render('register', { error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      profilePicture: '', // Default or handle in your form
      password: hashedPassword
    });

    await newUser.save();

    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { registerUser };
