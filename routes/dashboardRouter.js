const express = require('express');

const { verifyAccessToken } = require('../controller/authController.js');

const { getDashboardPage } = require('../controller/dashboardController.js');

const router = express.Router();

router.route(`/`).get([verifyAccessToken], getDashboardPage);

module.exports = router;
