
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('clients', function(table) {
      table.increments('id');
      table.string('email', 255).notNullable().unique();
      table.string('pass', 255).notNullable();
      table.string('name', 255).notNullable();
      table.string('surname', 255).notNullable();
      table.string('document_number', 255).notNullable();
      table.string('phone', 255).notNullable();
      table.text('address').notNullable();
      table.bool('isEnabled');
      table.timestamps(false, false);
      table.boolean('isRemoved');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .dropTable("clients"),
  ]);
};
