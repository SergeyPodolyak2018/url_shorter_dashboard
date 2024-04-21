const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repository/userRepository.js');
const MESSAGE = require('../helper/messages.js');
const { ACCESS_TOKEN_SECRET } = require('../const.js');
const { getUserByEmail } = require('../services/userService.js');

const verifyAccessToken = async (req, res, next) => {
  const token = req.cookies['SESSION_TOKEN'];
  if (token === '') {
    const massage = MESSAGE.UNAUTORIZED();
    return res.status(massage.status).json(massage.data);
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const email = decoded?.email;
    const user = await getUserByEmail(email);

    if (email && user[0]) {
      res.locals.decoded = { email, id: decoded.id, role: user[0].role };
      return next();
    } else {
      res.redirect('/auth/login');
      return;
    }
  } catch (err) {
    console.log(err);
    res.redirect('/auth/login');
    return;
  }
};

const getDataFromToken = async (token) => {
  if (token === '') {
    return { error: 'Not valid credentials' };
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const email = decoded?.email;
    const user = await getUserByEmail(email);

    if (email && user[0]) {
      return { email, id: decoded.id, role: user[0].role };
    } else {
      return { error: 'Not valid credentials' };
    }
  } catch (err) {
    console.log(err);
    return { error: 'Not valid credentials' };
  }
};

const verifyRole = async (req, res, next) => {
  const { role } = res.locals.decoded;
  if (role === 'admin') {
    return next();
  } else {
    res.render('./pages/permisions.ejs');
    return;
  }
};

module.exports = { verifyAccessToken, verifyRole, getDataFromToken };
