const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {}
Users.init(
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notContains: " ",
        len: [4, 25],
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    salt: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

Users.prototype.hash = function (plainPassword, salt) {
  return bcrypt.hash(plainPassword, salt);
};

Users.prototype.validatePassword = function (password) {
  return bcrypt
    .hash(password, this.salt)
    .then((hash) => hash === this.password);
};

module.exports = Users;
