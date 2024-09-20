const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Course Schema
const courseSchema = new Schema({
  courseName: { type: String, required: true },
  price: { type: Number, required: true }, 
  description: { type: String, default: '' },
  categories: { type: [String], default: [] }, // Add categories field
  createdAt: { type: Date, default: Date.now }
});

// Create and export the Course model
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
