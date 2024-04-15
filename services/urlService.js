const urlRepository = require('../repository/urlRepository.js');
const urlModel = require('../models/url.js');
const rateService = require('../services/rateService.js');

const getUrlByName = async (uiid) => {
  return urlRepository.getById(uiid);
};

const saveUrl = async (userId, url) => {
  try {
    const urlObj = new urlModel(url, userId);
    await urlRepository.save(urlObj);
    await rateService.initUrlRate(urlObj.id);
  } catch (err) {
    console.log(err);
  }
};

const getAll = (userId) => {
  return urlRepository.getByUser(userId);
};

module.exports = { getUrlByName, saveUrl, getAll };
