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
  return db.query().select('*').where('id', '=', id);
};

const getByUser = (id) => {
  return db.query().select('*').where('user_id', '=', id);
};

const modify = (id) => {
  const data = urlRep.get(id);
  data.visited();
};

const getAll = () => {
  return Array.from(urlRep).map(([name, value]) => value);
};

module.exports = { save, getById, getByUser, modify };
