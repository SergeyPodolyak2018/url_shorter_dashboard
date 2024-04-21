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

const getAllForUser = (userId) => {
  return urlRepository.getByUser(userId);
};
const getAll = () => {
  return urlRepository.getAll();
};
const deleteShort = (uiid) => {
  return urlRepository.deleteById(uiid);
};

const shortsQuantity = () => {
  return urlRepository.count();
};
const shortsSummOfAllVisits = () => {
  return urlRepository.sum('visits');
};
const topOfShorts = (quantity, id, colummn) => {
  return urlRepository.top(quantity, id, colummn);
};

module.exports = {
  getUrlByName,
  saveUrl,
  getAllForUser,
  getAll,
  deleteShort,
  shortsQuantity,
  shortsSummOfAllVisits,
  topOfShorts,
};
