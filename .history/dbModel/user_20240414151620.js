const { Model } = require('objection');
const db = require('../db/sqliteKnex.js');

Model.knex(db);

class UserslModel extends Model {
  static get tableName() {
    return 'Users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'password', 'created_time'],

      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        password: { type: 'string' },
        created_time: { type: 'number' },
      },
    };
  }
}

async function createSchema() {
  if (await db.schema.hasTable('Users')) {
    return;
  }

  await db.schema.createTable('Users', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('password').notNullable();
    table.integer('created_time').defaultTo(0);
  });
}

createSchema();

module.exports = UserslModel;
