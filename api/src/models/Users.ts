import {
  Model,
  DataTypes,
  Optional,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
} from "sequelize";
import sequelize from "../db";
import bcrypt from "bcryptjs";
import type Items from "./Items";

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  salt: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "salt">;

class Users extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare username: string;
  declare password: string;
  declare email: string;
  declare salt: string;
  declare items: Items[];
  declare addItems: BelongsToManyAddAssociationsMixin<Items, number>;
  declare removeItem: BelongsToManyRemoveAssociationMixin<Items, number>;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

Users.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notContains: " ", len: [4, 25] },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    salt: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "users" },
);

Users.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default Users;
