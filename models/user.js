let lastId = 0;

class UserModel {
  email;
  name;
  password;
  role;
  constructor(email, name, password) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.role = 'user';
  }
}

module.exports = UserModel;
