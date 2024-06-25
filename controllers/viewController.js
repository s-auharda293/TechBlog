exports.getHome = (req, res, next) => {
  //   console.log("hi");
  res.render("home");
};

exports.getSignUp = (req, res, next) => {
  res.render("signup");
};

exports.getLogIn = (req, res, next) => {
  res.render("login");
};
exports.getAllBlogs = (req, res, next) => {
  res.render("blogs");
};
exports.createBlog = (req, res, next) => {
  res.render("addBlog");
};
