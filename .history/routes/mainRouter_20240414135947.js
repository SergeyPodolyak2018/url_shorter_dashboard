const express = require('express');
const { getUrls, postUrls } = require('../controller/urlController.js');
const { verifyAccessToken } = require('../controller/authController.js');

const router = express.Router();

router.route(`/`).get(verifyAccessToken, (req, res) => {
  res.redirect('/url');
});

module.exports = router;
