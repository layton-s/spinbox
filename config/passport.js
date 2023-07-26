const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const SpotifyStrategy = require('passport-spotify').Strategy

passport.use(new GoogleStrategy(
  // Configuration object
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  // The verify callback function...
  // Marking a function as an async function allows us
  // to consume promises using the await keyword
  async function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    
    // When using async/await  we use a
    // try/catch block to handle an error
    try {
      // A user has logged in with OAuth...
      let user = await User.findOne({ googleId: profile.id });
      // Existing user found, so provide it to passport
      if (user) return cb(null, user);
      // We have a new user via OAuth!
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      return cb(null, user);
      
    } catch (err) {
      return cb(err);
    }
  }
));


passport.use(new SpotifyStrategy(
  {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK,
    userProfileURL: 'https://api.spotify.com/v1/me'
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    try {

      let user = await User.findOne({ spotifyId: profile.id });

     
      if (user) return cb(null, user);

      
      user = await User.create({
        name: profile.displayName,
        spotifyId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value 
      });
      
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id); // Assuming you have a unique 'id' field for the user
});

passport.deserializeUser(async function(id, cb) {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});