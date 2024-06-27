const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Blog = require("../../models/blogModel");
const User = require("../../models/userModel");

dotenv.config({ path: "./config.env" });

// console.log(process.env);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection unsuccessful!");
  });

const blogs = JSON.parse(
  fs.readFileSync("./dev-data/data/blogs.json", "utf-8")
);
const users = JSON.parse(
  fs.readFileSync("./dev-data/data/users.json", "utf-8")
);

// console.log(process.argv[2]);

const importData = async () => {
  try {
    await Blog.create(blogs);
    await User.create(users, { validateBeforeSave: false });
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
