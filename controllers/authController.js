const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({
      status: "error",
      message: "Please provide your email and password",
    });
    return next();
  }
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  // console.log(`newUser:${newUser}`);

  const token = jwt.sign({ newUser }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  };
  res.cookie("jwt", token, cookieOptions);

  res.status(201).json({
    status: "success",
    message: "User successfully created",
    token,
  });
};

// exports.login = async (req, res, next) => {
//   const { email, password } = req.body;
//   if(!email || !password){
//     res.status(400)
//   }
// };
