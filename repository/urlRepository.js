//const db = require('../db/sqlite');
const db = require('../dbModel/url.js');

const save = (urlModel) => {
  return db
    .query()
    .insert({
      uiid: urlModel.uiid,
      url: urlModel.url,
      visits: urlModel.visits,
      user_id: urlModel.user_id,
    })
    .returning('id');
};

const getById = (id) => {
  return db.query().select('*').where('uiid', '=', id);
};

const deleteById = (id) => {
  return db.query().where('uiid', '=', id).del();
};

const getByUser = (id) => {
  return db.query().select('*').where('user_id', '=', id);
};

const modify = (id, visits) => {
  console.log(id, visits);
  return db.query().update({ visits }).where({ id });
};

const getAll = () => {
  return db
    .query()
    .select('*')
    .innerJoin('Users', 'Users.id', '=', 'Urls.user_id');
};

const count = () => {
  return db.query().count({ total: 'id' }).first();
};

const sum = (column) => {
  return db.query().sum({ total: column }).first();
};

const top = (quantity, id, colummn) => {
  if (id) {
    return db
      .query()
      .select('*')
      .where('user_id', '=', id)
      .orderBy(colummn, 'desc')
      .limit(quantity);
  } else {
    return db.query().select('*').orderBy(colummn, 'desc').limit(quantity);
  }
};

module.exports = {
  save,
  getById,
  getByUser,
  modify,
  deleteById,
  getAll,
  count,
  sum,
  top,
};
