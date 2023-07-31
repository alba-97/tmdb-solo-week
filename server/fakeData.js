const Users = require("./models/Users");

const createData = () => {
  Users.create({
    username: "FranklyFrigid_98",
    password: "yNkU7McZ2YW3Xsmr",
    email: "FranklyFrigid_98@gmail.com",
  });
  Users.create({
    username: "FuzzySloth2",
    password: "yNkU7McZ2YW3Xsmr",
    email: "FuzzySloth2@gmail.com",
  });
  Users.create({
    username: "busilyOverseer_429",
    password: "aEJnFhUhkrfjdN9c",
    email: "busilyOverseer_429@gmail.com",
  });
  Users.create({
    username: "joyfullyUnification_387",
    password: "d9LtUcF6GTVuhRtL",
    email: "joyfullyUnification_387@gmail.com",
  });
  Users.create({
    username: "2frugal4u",
    password: "nEuVJV6MLrZY9wkF",
    email: "2frugal4u@gmail.com",
  });
};

module.exports = createData;
