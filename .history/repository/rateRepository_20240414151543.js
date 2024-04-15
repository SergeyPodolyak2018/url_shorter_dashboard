const db = require('../db');

const set = async (id, value) => {
  return db.set(id, value);
};

const get = async (id) => {
  return db.get(id);
};

const update = (id, value) => {};

module.exports = { set, get };
