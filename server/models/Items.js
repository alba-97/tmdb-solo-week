const Sequelize = require("sequelize");
const db = require("../db");

class Items extends Sequelize.Model {}
Items.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.TEXT,
    },
    genres: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    director: {
      type: Sequelize.STRING,
    },
    release_date: {
      type: Sequelize.STRING,
    },
    poster_path: {
      type: Sequelize.STRING,
    },
    overview: {
      type: Sequelize.TEXT,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "items",
  }
);

module.exports = Items;
