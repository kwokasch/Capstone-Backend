
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments()
      table.string('googleId')
      table.string('firstName')
      table.string('lastName')
      table.string('phoneNumber')
      table.string('email')
      table.string('password')
      table.string('password_digest')
      table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
