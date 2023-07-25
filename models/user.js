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
    required: false // You can decide if you want to make this required or not
  },
  email: String,
  avatar: String,
  // Additional Spotify-specific fields you may want to store
  // spotifyAccessToken: String,
  // spotifyRefreshToken: String,
  // spotifyDisplayName: String,
  // spotifyProfileImage: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);