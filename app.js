var express = require("express");
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require('./db'); // Import the DB connection
var { registerUser } = require('./controllers/userController'); // Import register function
var { loginUser } = require('./controllers/authController'); // Import login function
var isAuthenticated = require('./authMiddleware'); // Import authentication middleware

var app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

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
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "html");

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

// Route for My Account Page
app.get('/user-profile', isAuthenticated, (req, res) => {
  res.render('user-profile', {
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

app.post('/register', registerUser); // Use registerUser function

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
