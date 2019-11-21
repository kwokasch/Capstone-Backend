const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const users = require('../queries/users');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, cb) {
  console.log(profile)

//     const email = profile.emails[0].value;
  
//     const user = users.findByEmail(email)
//   const googleUser = {
//     display_name: profile.displayName,
//     email,
//     google_id: profile.id,
//     image_url: profile.photos[0].value,
//   };
//   console.log(googleUser)
//   if (user){

//   } else {

//   }

return cb(new Error ('working on it...'))
}
