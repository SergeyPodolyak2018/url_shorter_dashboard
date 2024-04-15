const express = require('express');
const {
  loginUser,
  loginUserPage,
  createUserPage,
} = require('../controller/loginController');
const { postUser } = require('../controller/userController');

const router = express.Router();

router.route(`/login`).get(loginUserPage).post(loginUser);

router.route(`/signup`).get(createUserPage).post(postUser);

module.exports = router;
