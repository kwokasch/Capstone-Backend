const pets = require("../pets_seeds")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pets').del()
    .then(function () {
      // Inserts seed entries
      return knex('pets').insert(pets);
    });
};
