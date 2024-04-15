const express = require('express');
const {
  loginUser,
  loginUserPage,
  createUserPage,
} = require('../controller/loginController');
const { postUser } = require('../controller/userController');

const router = express.Router();
router.route(`/`).get((req, res) => {
  res.redirect('/auth/login');
});

router.route(`/login`).get(loginUserPage).post(loginUser);

router.route(`/signup`).get(createUserPage).post(postUser);

module.exports = router;
