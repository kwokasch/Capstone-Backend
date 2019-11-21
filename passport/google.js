const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const users = require('../db/queries');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, cb) {
    const email = profile.emails[0].value
    console.log(email)
    console.log(profile)
    const formattedProfile = formatProfile(profile)
    const user = users.findByEmail(email)
    if (user) {

    } else {
        createUser()
    }
    return cb(new Error ('working on it...'))
}))

function formatProfile(profile){
    return {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        phoneNumber: "",
        email: profile.emails[0].value,
        password: ""
    }
}