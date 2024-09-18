const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require('./db'); // Import the DB connection
const userRoutes = require('./routes/userRoutes'); // Import user routes
const { loginUser } = require('./controllers/authController'); // Import login function
const isAuthenticated = require('./authMiddleware'); // Import authentication middleware
const cors = require('cors');

const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000', // Adjust to your front-end origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", `
    default-src 'none';
    script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net https://unpkg.com;
    style-src 'self' https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com 'unsafe-inline';
    img-src 'self' data: http://www.webcoderskull.com;  // Allow images from your domain and data URIs
    font-src 'self' http://localhost:3000;  // Allow fonts from your server
    connect-src 'self';
    frame-src 'self';
  `.replace(/\s{2,}/g, ' ')); // Replace multiple spaces with a single space
  next();
});

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.get('/proxy/libphonenumber-js.min.js', (req, res) => {
  const url = 'https://example.com/path/to/libphonenumber-js.min.js';
  req.pipe(request(url)).pipe(res);
});

// Set up session middleware
app.use(session({
  secret: 'learning',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));


app.engine(".html", require("ejs").__express);

// Optional since express defaults to CWD/views
app.set("views", path.join(__dirname, "views"));

// Path to our public directory
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.woff')) {
      res.setHeader('Content-Type', 'font/woff');
    } else if (path.endsWith('.ttf')) {
      res.setHeader('Content-Type', 'font/ttf');
    }
  }
}));
app.set("view engine", "html");

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Route for Home Page
app.get("/", function (req, res) {
  res.render("home"); // Renders views/home.html
});

// Route for About Us Page
app.get("/about", function (req, res) {
  res.render("about-us"); // Renders views/about-us.html
});

// Route for Pricing Page
app.get("/pricing", function (req, res) {
  res.render("pricing"); // Renders views/pricing.html
});

// Route handle for My account
app.get('/my-account', (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect('/login'); // Redirect to login page if not logged in
  }

  // Get the user's role from the session
  const { role } = req.session.user;

  // Redirect based on the user's role
  switch (role) {
    case 'admin':
      return res.redirect('/admin-profile');
    case 'instructor':
      return res.redirect('/instructor-profile');
    case 'user':
      return res.redirect('/user-profile');
    default:
      return res.redirect('/user-profile'); // Default fallback if role is unknown
  }
});


// Route for My Account Page - User
app.get('/user-profile', isAuthenticated, (req, res) => {
  res.render('user-profile', {
    fullName: req.session.user.fullName,
    email: req.session.user.email,
    phoneNumber: req.session.user.phoneNumber,
    profilePicture: req.session.user.profilePicture
  });
});

// Route for My Account Page - Instructor
app.get('/instructor-profile', isAuthenticated, (req, res) => {
  res.render('instructor-profile', {
    fullName: req.session.user.fullName,
    email: req.session.user.email,
    phoneNumber: req.session.user.phoneNumber,
    profilePicture: req.session.user.profilePicture
  });
});

// Route for My Account Page - Admin
app.get('/admin-profile', isAuthenticated, (req, res) => {
  res.render('admin-profile', {
    fullName: req.session.user.fullName,
    email: req.session.user.email,
    phoneNumber: req.session.user.phoneNumber,
    profilePicture: req.session.user.profilePicture
  });
});

// Route for Registration Page
app.get("/register", (req, res) => {
  res.render('register'); // Renders views/register.html
});

// Route for the Login Page
app.get('/login', (req, res) => {
  res.render('login'); // Render the login form
});

app.post('/login', loginUser); // Use loginUser function

// Route for Browse Page
app.get("/browse", function (req, res) {
  res.render("browse"); // Renders views/browse.html
});

// Route for FAQs Page
app.get("/faq", function (req, res) {
  res.render("faq"); // Renders views/faq.html
});

// Route for Contact Page
app.get("/contact", function (req, res) {
  res.render("contact"); // Renders views/contact.html
});

// Route for Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});


// Start the server
if (!module.parent) {
  app.listen(3000, () => {
    console.log("Express started on port 3000");
  });
}

// Function to generate a unique reset token (for demonstration purposes)
function generateResetToken() {
  return Math.random().toString(36).substr(2, 10); // Generate a random token
}
