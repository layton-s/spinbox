var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/albums',
    failureRedirect: '/albums'
  }
));

// Spotify OAuth login route
router.get('/auth/spotify', passport.authenticate(
  'spotify',
  {
    // Requesting the user's public profile
    scope: ['user-read-email', 'user-read-private'],
  }
));

// Spotify OAuth callback route
router.get('/auth/spotify/callback', passport.authenticate(
  'spotify',
  {
    successRedirect: '/albums',
    failureRedirect: '/albums'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router;