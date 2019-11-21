const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const request = require('request');
const rp = require('request-promise');
require('dotenv').config();

const app = express();
const cors = require('cors');

const auth = require('./auth/index')
const pets = require('./api/pets');
const users = require('./api/users');
const petfinder = require('./api/petfinder');

app.listen(3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/auth', auth)
app.use('/pets', pets)
app.use('/users', users)
app.use('/petfinder', petfinder)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

// render the error page
res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err.statusCode
  });
});

module.exports = app;
