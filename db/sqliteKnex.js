const Knex = require('knex');

// Initialize knex.
const db = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './storage/test.db',
  },
});

module.exports = db;
