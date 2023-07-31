const Users = require("./Users");
const Items = require("./Items");

Items.belongsToMany(Users, { through: "favorites" });
Users.belongsToMany(Items, { through: "favorites" });

module.exports = { Users, Items };
