const urlService = require('../services/urlService.js');
const userService = require('../services/userService.js');

const getUrls = async (req, res) => {
  const urls = await urlService.getAll(res.locals.decoded.id);
  console.info(res.locals.decoded.id);
  res.render('./pages/urls.ejs', { urls });
};

const postUrls = async (req, res) => {
  const { url } = req.body;
  console.info(res.locals.decoded.email);
  const user = await userService.getUserByEmail(res.locals.decoded.email);
  await urlService.saveUrl(user[0].id, url);
  res.redirect('/url');
};

module.exports = { getUrls, postUrls };
