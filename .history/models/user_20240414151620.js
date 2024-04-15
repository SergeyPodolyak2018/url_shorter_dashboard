let lastId = 0;

class UserModel {
  id;
  name;
  password;
  created_time;
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.created_time = new Date().getTime();
    lastId++;
    this.id = lastId;
  }
}

module.exports = UserModel;
