// @noflow

const Scrypt = require('scrypt-kdf');

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id');
      table.string('email', 255).notNullable();
      table.string('pass', 255).notNullable();
      table.timestamps(false, false);
      table.boolean('isRemoved');
    }).then(function() {
      return Scrypt.kdf('123456', { logN: 15 });
    }).then(function(password) {
      return knex("users").insert({
        email: 'arcollector@gmail.com',
        pass: password.toString('hex'),
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
        isRemoved: false
      });
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("users");
};
