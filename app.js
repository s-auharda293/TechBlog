const express = require("express");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/views", viewRouter);

module.exports = app;
