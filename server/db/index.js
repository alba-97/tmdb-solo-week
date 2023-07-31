const Sequelize = require("sequelize");
const { db } = require("../config/config");

const sequelize = new Sequelize(db, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
