import { Sequelize } from "sequelize";
import { DB_URI } from "../config/config";

const sequelize = new Sequelize(DB_URI, {
  dialect: "postgres",
  logging: false,
});

export default sequelize;
