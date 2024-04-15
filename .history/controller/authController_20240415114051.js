const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repository/userRepository.js');
const MESSAGE = require('../helper/messages.js');
const { ACCESS_TOKEN_SECRET } = require('../const.js');
const { getUserByEmail } = require('../services/userService.js');

const verifyAccessToken = (req, res, next) => {
  const token = req.cookies['SESSION_TOKEN'];
  if (token === '') {
    const massage = MESSAGE.UNAUTORIZED();
    return res.status(massage.status).json(massage.data);
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const email = decoded?.email;
    const user = getUserByEmail(email);
    if (email && user[0]) {
      res.locals.decoded = { email, id: decoded.id, role: user[0].role };
      return next();
    } else {
      res.redirect('/auth/login');
      return;
    }
  } catch (err) {
    res.redirect('/auth/login');
    return;
  }
};

module.exports = { verifyAccessToken };
