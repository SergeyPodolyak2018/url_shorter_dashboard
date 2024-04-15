const express = require('express');
const { getUser, postUser } = require('../controller/userController');
const { verifyAccessToken } = require('../controller/authController');
const {
  loginUser,
  loginUserPage,
  createUserPage,
} = require('../controller/loginController');

const router = express.Router();

router.route(`/`).get(verifyAccessToken, getUser).post(postUser);

module.exports = router;
