const userService = require('../services/userService');
const MESSAGE = require('../helper/messages');

const getUsers = (req, res) => {
  const users = userService.getAllUsers();
  const massage = MESSAGE.USERS(users);
  res.status(massage.status).json(massage.data);
};

const getUser = (req, res) => {
  const users = userService.getAllUsers();
  const massage = MESSAGE.USERS(users);
  res.status(massage.status).json(massage.data);
};

const postUser = async (req, res) => {
  const { email, username, password } = req.body;
  await userService.saveUser(email, username, password);

  res.redirect('/auth/login');
};

module.exports = { getUsers, postUser, getUser };
