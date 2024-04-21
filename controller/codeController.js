const urlService = require('../services/urlService');
const codeService = require('../services/codeService');
const rateService = require('../services/rateService');
const MESSAGE = require('../helper/messages');

const checkId = (req, res, next, id) => {
  const someId = id || req.params.id;
  res.locals.shorts = someId;
  next();
};

const checkRate = async (req, res, next) => {
  let shortCode = res.locals.shorts;
  let userId = res.locals.decoded.id;
  const check = await rateService.checkRate(userId, shortCode);
  if (check) {
    await rateService.incrementURLRate(shortCode);
    await rateService.incrementUserRate(userId);
    return next();
  } else {
    const massage = MESSAGE.TO_MANY_REQUEST();
    res.status(massage.status);
    res.render('./pages/rate.ejs');
    return;
  }
};

const getCode = async (req, res) => {
  let shortCode = res.locals.shorts;

  const code = await codeService.getCode(shortCode);
  if (code.length > 0) {
    await codeService.visitCode(code[0].id, code[0].visits + 1);
    res.redirect(code[0].url);
  }
};
const deleteCode = async (req, res) => {
  let shortCode = res.locals.shorts;

  try {
    const code = await codeService.deleteCode(shortCode);

    res.redirect('/shorts');
  } catch (err) {
    console.log(err);
    res.redirect('/shorts');
  }
};

module.exports = { getCode, checkId, checkRate, deleteCode };
