const passport = require('passport');
const express = require('express');
require('../passport/google');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
    // scope: ['https://www.googleapis.com/auth/plus.login']
  }));

router.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/login' }),
    function(req, res){
        //Successful auth, redirect home
        res.redirect('/');
})

module.exports = router;