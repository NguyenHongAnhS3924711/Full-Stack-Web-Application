const bcrypt = require('bcrypt');
const User = require('../models/user');

const loginUser = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    // Find the user by email or phone number
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }]
    });

    if (!user) {
      return res.status(401).render('login', { error: 'Invalid email/phone or password' });
    }

    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).render('login', { error: 'Invalid email/phone or password' });
    }

    // Save user data in session
    req.session.user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture
    };

    res.redirect('/user-profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { loginUser };
