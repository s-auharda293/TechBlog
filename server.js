const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
});

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

process.on("unhandledRejection", () => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
