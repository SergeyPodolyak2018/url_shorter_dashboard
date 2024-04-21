const express = require('express');
const { getUrls, postUrls } = require('../controller/urlController.js');
const { verifyAccessToken } = require('../controller/authController.js');
const {
  getCode,
  checkId,
  checkRate,
  deleteCode,
} = require('../controller/codeController.js');

const router = express.Router();
router.param('id', checkId);

router
  .route(`/`)
  .get(verifyAccessToken, getUrls)
  .post(verifyAccessToken, postUrls);

router
  .route(`/:id`)
  .get([verifyAccessToken, checkRate], getCode)
  .delete(verifyAccessToken, deleteCode);

module.exports = router;
