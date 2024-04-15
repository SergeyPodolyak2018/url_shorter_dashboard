const { Model } = require('objection');
const db = require('../db/sqliteKnex.js');

Model.knex(db);

class UrlslModel extends Model {
  static get tableName() {
    return 'Urls';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['uiid', 'url', 'user_id'],

      properties: {
        id: { type: 'string' },
        uiid: { type: 'string' },
        url: { type: 'string' },
        visits: { type: 'number' },
        created_time: { type: 'number' },
        user_id: { type: 'number' },
      },
    };
  }
}

table.increments('id').primary();
table.string('uiid', 100).unique().notNullable();
table.text('url').notNullable();
table.integer('visits').defaultTo(0);
table.timestamp('created_time', { useTz: false });
table.integer('user_id').unsigned();
table.foreign('user_id').references('Users.id');

module.exports = UrlslModel;
