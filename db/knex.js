const environment = require('../knexfile').production;
const config = require('../knexfile');
const environmentConfig = config[environment];
const knex = require('knex');
const connection = knex(environment)

module.exports = connection