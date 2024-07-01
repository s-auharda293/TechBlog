const AppError = require("./../utils/AppError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
  return token;
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError("Please fill in all details!", 400));
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(new AppError("This email has already been taken!", 400));
  }

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  //   const id = newUser._id;
  const id = newUser._id;
  const token = generateToken(id);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: maxAge,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    message: "User created!",
    user: id,
    token,
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter your email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const id = user._id;

  const token = generateToken(id);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: maxAge * 1000,
  });

  res.status(200).json({
    status: "success",
    message: "User Logged in successfully",
    user: id,
  });
});

exports.logOut = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.redirect("/views");
});
