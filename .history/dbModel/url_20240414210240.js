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
      required: [],

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

module.exports = UrlslModel;
