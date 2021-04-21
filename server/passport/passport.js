const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../data/models');

passport.serializeUser((user, done) => {
  // console.log('inside SERIALIZER: ', user)
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log('inside DEserializer: ', user)
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/login/OAuth/callback',
  passReqToCallback: true,
},
((request, accessToken, refreshToken, profile, done) => {
  // console.log(profile);
  const { displayName, email, photos } = profile;
  const findQuery = { 
    text: 'SELECT * FROM users WHERE email = $1 LIMIT 1', 
    values: [email],
  };

  const insertQuery = { 
    text: 'INSERT INTO users (name, photo_url, email) VALUES ($1, $2, $3)',
    values: [displayName, photos[0].value, email],
  };
  // checking if user exists in DB: 
  //find a user whose email is the same as teh proflie email
  db.query(findQuery).then((data) => { 
    // console.log('inside db.query findQuery: ', data) 
    if (data.rows.length) { 
      // console.log('data.rows: ', data.rows)
      return done(null, profile, accessToken)
    } else {
      db.query(insertQuery).then((insertData) => {
        // console.log('inside db.query insertQuery: ', insertData);
        return done(null, profile, accessToken)
      }).catch(e => console.error(e))
    };
  }).catch( e => {
    console.error(e)
  })
})));
