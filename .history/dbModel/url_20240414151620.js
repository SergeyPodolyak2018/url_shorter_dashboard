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
      required: ['id', 'url', 'created_time', 'user_id'],

      properties: {
        id: { type: 'string' },
        url: { type: 'string' },
        visits: { type: 'number' },
        created_time: { type: 'number' },
        user_id: { type: 'number' },
      },
    };
  }
}

async function createSchema() {
  if (await db.schema.hasTable('Urls')) {
    return;
  }

  await db.schema.createTable('Urls', (table) => {
    table.text('id').primary().notNullable();
    table.text('url').notNullable();
    table.integer('visits').defaultTo(0);
    table.integer('created_time').defaultTo(0);
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('Users.id');
  });
}

createSchema();

module.exports = UrlslModel;
