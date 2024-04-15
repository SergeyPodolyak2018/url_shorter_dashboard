const urlepository = require('../repository/urlRepository');

const getCode = (id) => {
  const user = urlepository.get(id);
  return user;
};
const visitCode = (id, visits) => {
  urlepository.modify(id, visits);
  return;
};

module.exports = { getCode, visitCode };
