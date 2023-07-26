module.exports = function(req, res, next) {
  
  if (req.isAuthenticated() && (req.user.googleId || req.user.spotifyId)) {
    return next();
  }

  
  if (req.user && req.user.googleId) {
    res.redirect('/auth/google');
  } else if (req.user && req.user.spotifyId) {
    res.redirect('/auth/spotify');
  } else {
 
    res.redirect('/'); 
  }
};
  