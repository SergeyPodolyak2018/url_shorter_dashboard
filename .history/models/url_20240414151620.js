const { generateHash } = require('../helper/hashgenerator');

class UrlModel {
  id;
  url;
  visits;
  created_time;
  user;
  constructor(url, user) {
    this.url = url;
    this.visits = 0;
    this.user_id = user;
    this.created_time = new Date().getTime();
    this.id = generateHash(5);
  }
  visited() {
    this.visits = this.visits + 1;
  }
}

module.exports = UrlModel;
