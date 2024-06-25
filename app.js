const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const viewRouter = require("./routes/viewRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/globalErrorHandler");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use("/views", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
