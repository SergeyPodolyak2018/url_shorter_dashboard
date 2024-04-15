// Update with your config settings.
const config = {
  client: 'sqlite3',
  connection: {
    filename: './storage/test.db',
  },
};
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: config,
  production: config,
};
