
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('weeks', function(table) {
      table.increments('id');
      table.string('number', 2).notNullable();
      table.string('year', 4).notNullable();
      table.integer('residences_id').notNullable();
      table.enum('purchase_method', ['premium', 'bidding', 'hotsale']).nullable()
      table.integer('clients_id').nullable();
      table.bool('isEnabled').notNullable();
      table.timestamps(false, false);
      table.boolean('isRemoved');
      table.foreign('residences_id')
        .references('residences.id');
      table.foreign('clients_id')
        .references('clients.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .dropTable("weeks"),
  ]);
};
