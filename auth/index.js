const passport = require('passport');
const express = require('express');
require('../passport/google');

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/login' }),
    function(req, res){
        //Successful auth, redirect home
        res.redirect('/');
})

module.exports = router;