const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const users = require('../db/queries');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
    // const email = profile.emails[0].value
    const formattedProfile = formatProfile(profile)
    const user = users.findOrCreate(formattedProfile)
    // console.log(user)
    return done(null, user)
}))

function formatProfile(profile){
    return {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        phoneNumber: "",
        email: profile.emails[0].value,
        password: ""
    }
}