const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
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
  console.log(`newUser:${newUser}`);
  const token = jwt.sign({ newUser }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({
    status: "success",
    message: "User successfully created",
    token,
  });
};
