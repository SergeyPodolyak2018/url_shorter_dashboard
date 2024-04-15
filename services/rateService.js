const rateRepository = require('../repository/rateRepository');
const { URL_RATE, USER_RATE } = require('../const');

const USER_PREFIX = 'user_';
const USER_NEXT_TIME_PREFIX = 'user_time_';
const URL_PREFIX = 'url_';
const URL_INTERVAL = Math.trunc(3600000 / URL_RATE);
const USER_TIME_INTERVAL = 86400000;

const createUserKey = (name) => {
  return USER_PREFIX + name;
};

const createUrlKey = (name) => {
  return URL_PREFIX + name;
};

const createUserTimeKey = (name) => {
  return USER_NEXT_TIME_PREFIX + name;
};

const checkUserRate = async (id) => {
  const rate = await rateRepository.get(createUserKey(id));
  const userNextTime = await rateRepository.get(createUserTimeKey(id));
  const currentMoment = new Date().getTime();
  if (rate && Number(rate) < 0) {
    if (userNextTime && Number(userNextTime) < currentMoment) {
      await initUserNextTime(id);
      await initUserRate(id);
      return true;
    }
    return false;
  }
  return true;
};

const checkURLRate = async (id) => {
  const rate = await rateRepository.get(createUrlKey(id));
  const currentMoment = new Date().getTime();
  if (rate && Number(rate) > currentMoment) return false;
  return true;
};

const checkRate = async (userId, urlCode) => {
  const urlRate = await checkURLRate(urlCode);
  const userRate = await checkUserRate(userId);
  return urlRate && userRate;
};

const incrementURLRate = async (id) => {
  const nextTimePoint = new Date().getTime() + URL_INTERVAL;
  rateRepository.set(createUrlKey(id), nextTimePoint);
};

const incrementUserRate = async (userid) => {
  const rate = await rateRepository.get(createUserKey(userid));
  rateRepository.set(createUserKey(userid), Number(rate) - 1);
};

const initUserRate = async (id) => {
  await rateRepository.set(createUserKey(id), USER_RATE);
};

const initUserNextTime = async (id) => {
  const nextTime = new Date().getTime() + USER_TIME_INTERVAL;
  await rateRepository.set(createUserTimeKey(id), nextTime);
};

const initUrlRate = async (id) => {
  await rateRepository.set(createUrlKey(id), new Date().getTime());
};

module.exports = {
  checkUserRate,
  checkURLRate,
  initUserRate,
  initUrlRate,
  incrementURLRate,
  initUserNextTime,
  incrementUserRate,
  checkRate,
};
