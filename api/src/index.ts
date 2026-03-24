import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./db";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", routes);

const PORT = process.env.PORT || 8000;

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
