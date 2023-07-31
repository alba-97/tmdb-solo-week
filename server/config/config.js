require("dotenv").config();

const config = {
  api: process.env.TMDB_API_KEY,
  secret: process.env.JWT_SECRET,
  db: process.env.DB_NAME,
};

module.exports = config;
