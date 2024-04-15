const urlService = require('../services/urlService.js');
const userService = require('../services/userService.js');
const Logger = require('../logger.js');
const log = new Logger('urlController.js');

const getUrls = async (req, res) => {
  const urls = await urlService.getAll(res.locals.decoded.id);
  log.info(res.locals.decoded.id);
  res.render('./pages/urls.ejs', { urls });
};

const postUrls = async (req, res) => {
  const { url } = req.body;
  log.info(res.locals.decoded.username);
  const user = await userService.getUserByName(res.locals.decoded.username);
  await urlService.saveUrl(user[0].id, url);
  res.redirect('/url');
};

module.exports = { getUrls, postUrls };
