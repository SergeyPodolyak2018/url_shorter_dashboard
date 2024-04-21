const userService = require('../services/userService');
const urlService = require('../services/urlService');
const rateService = require('../services/rateService');
const MESSAGE = require('../helper/messages');

const getAdminPage = async (req, res) => {
  const users = await userService.getAllUsers();
  for await (let el of users) {
    const rate = await rateService.getUserRate(el.id);
    el.rate = rate;
  }
  const shorts = await urlService.getAll();

  res.render('./pages/administration.ejs', { users, shorts });
};

const createUser = async (req, res) => {
  const { email, username, password } = req.body;
  await userService.saveUser(email, username, password);
  res.redirect('/admin');
};

const clearUserRate = async (req, res) => {
  const { id } = req.params;
  await rateService.initUserRate(id);
  res.redirect('/admin');
};

const deleteShort = async (req, res) => {
  const { uiid } = req.params;
  await urlService.deleteShort(uiid);
  res.redirect('/admin');
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.redirect('/admin');
};

module.exports = {
  getAdminPage,
  createUser,
  createUser,
  clearUserRate,
  deleteShort,
  deleteUser,
};
