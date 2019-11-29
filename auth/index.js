// const passport = require('passport');
// const express = require('express');
// require('../passport/google');
// const { create } = require('./jwtauth');
// const router = express.Router();

// router.get('/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email']
//   }));

// router.get('/google/callback', (req, res, next) => {
//   passport.authenticate('google', async (err, user) => {
//       if(err) { return next(err) }
//       try {
//         const token = await create(user)
//         res.redirect(`http://localhost:3001/userprofile/${user.email}`)
//       } catch (error) {
//         res.redirect('http://localhost:3001/login');
//       }
//   }) (req, res, next)
// })

// module.exports = router;