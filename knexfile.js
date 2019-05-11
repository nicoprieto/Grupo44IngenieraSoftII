// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_NAME
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_NAME
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
