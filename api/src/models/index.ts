import Users from "./Users";
import Items from "./Items";

Items.belongsToMany(Users, { through: "favorites" });
Users.belongsToMany(Items, { through: "favorites" });

export { Users, Items };
