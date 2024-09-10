var express = require("express");
var path = require("path");
var app = (module.exports = express());

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
  res.render("about-us"); // Renders views/band.html
});

// Route for Pricing Page
app.get("/pricing", function (req, res) {
  res.render("pricing"); // Renders views/tour.html
});

// Route for My Account Page
app.get("/account", function (req, res) {
  res.render("account"); // Renders views/contact.html
});

// Route for Browse Page
app.get("/browse", function (req, res) {
  res.render("browse"); // Renders views/contact.html
});

// Route for FAQs Page
app.get("/faq", function (req, res) {
  res.render("faq"); // Renders views/contact.html
});

// Route for Contact Page
app.get("/contact", function (req, res) {
  res.render("contact"); // Renders views/contact.html
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}
