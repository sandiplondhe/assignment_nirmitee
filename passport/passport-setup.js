const passport=require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "383380537032-vnmpeq5fp8luo3klfiksu6thiaigghbm.apps.googleusercontent.com",
    clientSecret: "A1aSaiPAfscak-H1DJEt46uy",
    callbackURL: "http://localhost:5000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));