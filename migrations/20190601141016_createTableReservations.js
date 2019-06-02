
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('reservations', function(table) {
      table.increments('id');
      table.integer('residences_id').notNullable();
      table.string('title', 255).notNullable();
      table.string('description', 255).notNullable();
      table.datetime('premium_date_start').notNullable();
      table.datetime('premium_date_end').notNullable();
      table.datetime('bidding_date_start').notNullable();
      table.datetime('bidding_date_end').notNullable();
      table.datetime('hotsale_date_start').notNullable();
      table.datetime('hotsale_date_end').notNullable();
      table.enum('purchase_method', ['premium', 'bidding', 'hotsale']).nullable()
      table.bool('isEnabled');
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
      .dropTable("reservations"),
  ]);
};
