const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: false
  },
  spotifyId: {
    type: String,
    required: false,
  },
  email: String,
  avatar: String,
  // spotifyAccessToken: String,
  // spotifyRefreshToken: String,
  // spotifyDisplayName: String,
  // spotifyProfileImage: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);