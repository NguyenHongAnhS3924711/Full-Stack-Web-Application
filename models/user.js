const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  zipcode: { type: String, default: '' },
  country: { type: String, default: '' },
  role: { type: String, enum: ['admin', 'instructor', 'user'], default: 'user' },
  schoolName: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
  specialization: { type: [String], default: [] }
}, { collection: 'Users' });

userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
