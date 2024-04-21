const userRep = new Map();

const db = require('../dbModel/user.js');

const save = (userModel) => {
  return db
    .query()
    .insert({
      email: userModel.email,
      name: userModel.name,
      password: userModel.password,
      role: userModel.role,
    })
    .returning('id');
};

const get = (id) => {
  return userRep.get(id);
};

const getByName = (email) => {
  return db.query().select('*').where('email', '=', email);
};

const getAll = () => {
  return db.query().select('*');
};

const deleteUser = (id) => {
  const idLoc = Number(id);

  return db.query().where('id', '=', idLoc).del();
};

module.exports = { save, get, getAll, getByName, deleteUser };
