const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");

const createData = require("./fakeData");
const routes = require("./routes");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", routes);

const PORT = 8080;
const force = false;

db.sync({ force }).then(() => {
  if (force) createData();
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });
});
