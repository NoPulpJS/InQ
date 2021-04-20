const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/login/OAuth/callback',
  passReqToCallback: true,
},
((request, accessToken, refreshToken, profile, done) => {
  console.log(profile);
  // User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
  // done(null, profile, accessToken);
})));

module.exports = {
  login: (req, res, next) => {
    console.log('INSIDE LOGIN IN OAUTHCONTROLLER');
    passport.authenticate('google', {
      scope:
      ['email', 'profile'],
    });
  },
  callback: (req, res, next) => {
    passport.authenticate('google', {
      successRedirect: '/auth/google/success',
      failureRedirect: '/auth/google/failure',
    });
  },
};

// client ID = 399185814213-6l9ad9hmfoak1dcg2p1klg46vhrcpcog.apps.googleusercontent.com
// client secret _3qNTR1w_4ICpZc1NSogu2tb
