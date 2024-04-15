const express = require('express');
const { getUrls, postUrls } = require('../controller/urlController.js');
const { verifyAccessToken } = require('../controller/authController.js');

const router = express.Router();

router
  .route(`/`)
  .get(verifyAccessToken, getUrls)
  .post(verifyAccessToken, postUrls);

router
  .route(`/:id/comments/`)
  .get(getAllArticleComments)
  .post(checkArticleComment, postArticleComment);

module.exports = router;
