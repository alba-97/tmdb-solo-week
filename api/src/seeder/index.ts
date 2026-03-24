import db from "../db";
import "../models";
import createData from "../db/fakeData";

db.sync({ force: true }).then(async () => {
  await createData();
  await db.close();
});
