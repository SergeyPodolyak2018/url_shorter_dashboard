const userRep = new Map();

const db = require('../dbModel/user.js');

const save = (userModel) => {
  console.log(userModel);
  return db
    .query()
    .insert({
      email: userModel.email,
      name: userModel.name,
      password: userModel.password,
    })
    .returning('id');
};

const get = (id) => {
  return userRep.get(id);
};

const getByName = (name) => {
  return db.query().select('*').where('name', '=', name);
};

const getAll = () => {
  return userRep;
};

module.exports = { save, get, getAll, getByName };
