const urlepository = require('../repository/urlRepository');

const getCode = (id) => {
  const url = urlepository.getById(id);
  return url;
};
const visitCode = (id, visits) => {
  return urlepository.modify(id, visits);
};

module.exports = { getCode, visitCode };
