const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    branch: String,
    college: String,
    skills: [String],
    achievements: [String],
    pastParticipations: [String],
    socialMedia: {
      linkedin: String,
      github: String
    }
  }, { timestamps: true });

const User = mongoose.model('User', UserSchema);  // Removed extra space

module.exports = User;
