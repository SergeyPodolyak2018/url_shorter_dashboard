const userService = require('../services/userService');
const urlService = require('../services/urlService');
const rateService = require('../services/rateService');
const MESSAGE = require('../helper/messages');

const getDashboardPage = async (req, res) => {
  res.render('./pages/dashboard.ejs', { role: res.locals.decoded.role });
};

const getDashboardData = async (userId) => {
  const shortsQuantity = await urlService.shortsQuantity();
  const sumVisits = await urlService.shortsSummOfAllVisits();
  const topAll = await urlService.topOfShorts(5, null, 'visits');
  const topMy = await urlService.topOfShorts(5, userId, 'visits');
  return { shortsQuantity, sumVisits, topAll, topMy };
};

module.exports = {
  getDashboardPage,
  getDashboardData,
};
