const bcrypt = require('bcrypt');
const userRepository = require('../repository/userRepository.js');
const rateSrvice = require('../services/rateService.js');
const UserModel = require('../models/user');

const getUserByName = async (name) => {
  return userRepository.getByName(name);
};

const saveUser = async (email, username, password) => {
  console.log(email, username, password);
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

module.exports = { getUserByName, saveUser, getAllUsers };
