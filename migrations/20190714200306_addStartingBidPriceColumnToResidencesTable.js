// @noflow

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.table('residences_photos').delete(),
    knex.table('weeks').delete(),
    knex.schema.dropTable('residences').then(function() {
      return knex.schema.createTable('residences', function(table) {
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
        table.float('starting_bid_price');
        table.timestamps(false, false);
        table.boolean('isRemoved');
      });
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    /* unreservable */
  ]);
};
