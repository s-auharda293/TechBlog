const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
const port = process.env.PORT || 3000;

mongoose
  .connect(DB, {
    autoIndex: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
