const express = require('express');
const { verifyAccessToken } = require('../controller/authController.js');

const router = express.Router();

router.route(`/`).get(verifyAccessToken, (req, res) => {
  res.redirect('/shorts');
});

module.exports = router;
