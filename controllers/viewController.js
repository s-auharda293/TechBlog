exports.getHome = (req, res, next) => {
  //   console.log("hi");
  res.render("home");
  next();
};
