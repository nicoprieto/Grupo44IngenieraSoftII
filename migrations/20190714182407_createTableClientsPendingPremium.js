
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('clients_pending_premium', function(table) {
      table.increments('id');
      table.integer('clients_id').notNullable();
      table.text('description').nullable();
      table.enum('type', ['upgrade', 'downgrade']).notNullable();
      table.timestamps(false, false);
      table.boolean('isRemoved');
      table.foreign('clients_id')
        .references('clients.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .dropTable('clients_pending_premium'),
  ]);
};
