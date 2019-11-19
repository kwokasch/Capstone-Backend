var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fetch = require('node-fetch');
var request = require("request");
var rp = require('request-promise');
require('dotenv').config();

var app = express();
var cors = require('cors');

const pets = require('./api/pets');
const users = require('./api/users');
const petfinder = require('./api/petfinder');

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
