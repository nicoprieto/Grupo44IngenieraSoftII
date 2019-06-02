// @noflow

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('residences', function(table) {
      table.increments('id');
      table.string('title', 255).notNullable();
      table.string('description', 255).notNullable();
      table.string('address_street', 255).notNullable();
      table.string('address_number', 255).notNullable();
      table.string('address_postal_code', 255).notNullable();
      table.string('address_city', 255).notNullable();
      table.string('address_state', 255).notNullable();
      table.string('address_nation', 255).notNullable();
      table.string('address_apartament', 255).notNullable();
      table.string('address_flat', 255).notNullable();
      table.boolean('isEnabled');
      table.float('price');
      table.timestamps(false, false);
      table.boolean('isRemoved');
    }),
    knex.schema.createTable('residences_photos', function(table) {
      table.increments('id');
      table.integer('residences_id');
      table.string('filename', 255).notNullable();
      table.timestamps(false, false);
      table.boolean('isRemoved');
      table.foreign('residences_id')
        .references('residences.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .dropTableIfExists("residences_photos"),
    knex.schema
      .dropTableIfExists("residences")
  ]);
};
