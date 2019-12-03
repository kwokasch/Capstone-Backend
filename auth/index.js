const passport = require('passport');
const express = require('express');
require('../passport/google');
const { create } = require('./utils');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email']
  }));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', {sessionl: false}, async (err, user) => {
      if(err) { return next(err) }
      try {
        const token = await create(user)
        res.redirect(`${process.env.CLIENT_REDIRECT}?token=${token}`)
      } catch (error) {
        res.redirect(`${process.env.CLIENT_ERROR_REDIRECT}${error.message}`)
        res.json({ error })
      }
  }) (req, res, next)
})

module.exports = router;