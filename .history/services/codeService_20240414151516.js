const urlepository = require('../repository/urlRepository');

const getCode = (id) => {
  const user = urlepository.get(id);
  return user;
};
const visitCode = (id) => {
  urlepository.modify(id);
  return;
};

module.exports = { getCode, visitCode };
