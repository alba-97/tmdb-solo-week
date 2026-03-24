import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../db";

interface ItemAttributes {
  id: number;
  title?: string;
  genres?: string[];
  director?: string;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  category: string;
}

type ItemCreationAttributes = Optional<ItemAttributes, never>;

class Items extends Model<ItemAttributes, ItemCreationAttributes> {
  declare id: number;
  declare title: string | undefined;
  declare genres: string[] | undefined;
  declare director: string | undefined;
  declare release_date: string | undefined;
  declare poster_path: string | undefined;
  declare overview: string | undefined;
  declare category: string;
}

Items.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    title: { type: DataTypes.TEXT },
    genres: { type: DataTypes.ARRAY(DataTypes.STRING) },
    director: { type: DataTypes.STRING },
    release_date: { type: DataTypes.STRING },
    poster_path: { type: DataTypes.STRING },
    overview: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "items" },
);

export default Items;
