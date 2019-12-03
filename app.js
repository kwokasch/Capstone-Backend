require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt')
const knex = require('knex')
const config = require('./knexfile')[process.env.NODE_ENV || "development"]
const database = knex(config)
const jwt = require('jsonwebtoken')

const { checkAuthHeaderSetUser, checkAuthHeaderSetUserUnAuthorized, notFound, errorHandler } = require('./middlewares/index')

const app = express();
const cors = require('cors');
const auth = require('./auth/index');

const pets = require('./api/pets');
const users = require('./api/users');
const petfinder = require('./api/petfinder');

app.listen(3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())

app.use(cors());
app.use(passport.initialize());
app.use(checkAuthHeaderSetUser);

app.get('/', checkAuthHeaderSetUserUnAuthorized, (req, res) => {
  res.json({
    message: 'we are home'
  })
})

app.use('/auth', auth)
app.use('/pets', pets)
app.use('/users', users)
app.use('/petfinder', petfinder)

// middleware errors
app.use(notFound)
app.use(errorHandler)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {

// // render the error page
// res.status(err.status || 500);
//   res.json({
//     message: err.message,
//     error: err.statusCode
//   });
// });

module.exports = app;
