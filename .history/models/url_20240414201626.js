const { generateHash } = require('../helper/hashgenerator');

class UrlModel {
  uiid;
  url;
  visits;
  created_time;
  user;
  constructor(url, user) {
    this.url = url;
    this.visits = 0;
    this.user_id = user;
    this.uiid = generateHash(5);
  }
  visited() {
    this.visits = this.visits + 1;
  }
}

module.exports = UrlModel;
