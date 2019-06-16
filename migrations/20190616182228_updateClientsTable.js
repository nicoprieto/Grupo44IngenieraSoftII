
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('clients').then(function() {
      return knex.schema.createTable('clients', function(table) {
        table.increments('id');
        table.string('email', 255).notNullable().unique();
        table.string('pass', 255).notNullable();
        table.string('name', 255).notNullable();
        table.string('surname', 255).notNullable();
        table.string('birth_date', 255).notNullable();
        table.string('document_number', 255).notNullable();
        table.string('phone', 255).notNullable();
        table.string('credit_card_number', 255).notNullable();
        table.string('credit_card_expiration', 255).notNullable();
        table.string('credit_card_owner', 255).notNullable();
        table.string('credit_card_security_code', 255).notNullable();
        table.text('address').notNullable();
        table.bool('isEnabled');
        table.timestamps(false, false);
        table.boolean('isRemoved');
      })
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("clients").then(function() {
      return knex.schema.createTable('clients', function(table) {
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
    })
  ]);
};
