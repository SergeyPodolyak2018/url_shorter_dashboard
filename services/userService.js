const bcrypt = require('bcrypt');
const userRepository = require('../repository/userRepository.js');
const rateSrvice = require('../services/rateService.js');
const UserModel = require('../models/user');

const getUserByEmail = async (email) => {
  return userRepository.getByName(email);
};

const saveUser = async (email, username, password) => {
  try {
    const encryptPass = await bcrypt.hash(password, 10);
    const user = new UserModel(email, username, encryptPass);
    const rez = await userRepository.save(user);
    await rateSrvice.initUserRate(rez.id);
    await rateSrvice.initUserNextTime(rez.id);
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = () => {
  return userRepository.getAll();
};
const deleteUser = (id) => {
  return userRepository.deleteUser(id);
};

module.exports = { getUserByEmail, saveUser, getAllUsers, deleteUser };
