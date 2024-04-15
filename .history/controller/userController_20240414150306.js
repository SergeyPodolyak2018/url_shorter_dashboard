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
  const { username, password } = req.body;
  await userService.saveUser(username, password);

  res.redirect('/login');
};

module.exports = { getUsers, postUser, getUser };
