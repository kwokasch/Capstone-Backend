
exports.up = function(knex) {
    return knex.schema.createTable('pets', (table) => {
        table.increments()
        table.boolean('lostStatus')
        table.string('name')
        table.string('species')
        table.string('gender')
        table.string('size')
        table.string('color')
        table.string('age')
        table.string('breed')
        table.string('temperament')
        table.text('comments')
        table.date('dateLostOrFound')
        table.string('chipId')
        table.text('additionalLostFoundInfo')
        table.string('latitude')
        table.string('longitude')
        table.string('pictureUrl')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pets')
  };
  