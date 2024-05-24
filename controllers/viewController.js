exports.getHome = (req, res, next) => {
  //   console.log("hi");
  res.render("home");
  next();
};

exports.getSignUp = (req, res, next) => {
  res.render("signup");
  next();
};

exports.getLogIn = (req, res, next) => {
  res.render("login");
  next();
};
exports.getAllBlogs = (req, res, next) => {
  res.render("blogs");
  next();
};
exports.createBlog = (req, res, next) => {
  res.render("addBlog");
  next();
};
