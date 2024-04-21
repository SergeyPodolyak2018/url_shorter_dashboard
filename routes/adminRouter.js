const express = require('express');

const {
  verifyAccessToken,
  verifyRole,
} = require('../controller/authController.js');

const {
  getAdminPage,
  deleteUser,
  createUser,
  deleteShort,
  clearUserRate,
} = require('../controller/adminController.js');

const router = express.Router();

router.route(`/`).get([verifyAccessToken, verifyRole], getAdminPage);
router.route(`/user`).post([verifyAccessToken, verifyRole], createUser);
router.route(`/user/:id`).delete([verifyAccessToken, verifyRole], deleteUser);
router
  .route(`/shorts/:uiid`)
  .delete([verifyAccessToken, verifyRole], deleteShort);
router.route(`/rate/:id`).put([verifyAccessToken, verifyRole], clearUserRate);

module.exports = router;
