const Blog = require("./../models/blogModel");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const multer = require("multer");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  // const cookies = req.cookies;

  // if (cookies.jwt) {
  //   const token = cookies.jwt;
  //   if (!token) {
  //     return next(
  //       new AppError("You are not logged in! Please login to get access.", 401)
  //     );
  //   }

  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log(decoded);

  //   const currentUser = await User.findById(decoded.id);
  //   // console.log(currentUser);

  //   if (!currentUser) {
  //     return next(new AppError("Please login to get access.", 401));
  //   }
  const blogs = await Blog.find();
  res
    .status(200)
    .render("blogs", { title: "Blog Ahead", blogs, length: blogs.length });
  // } else {
  //   res.render("unauthorized");
  // }
});

exports.getBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.status(200).json({
    blog: blog,
  });
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadPhoto = upload.single("photo");

exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `blog-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(4000, 4000)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.file.filename}`);
  next();
});

exports.createBlog = catchAsync(async (req, res) => {
  // const author = req.user._id;
  const { title, content, tags } = req.body;

  const image = req.file.filename;

  // await Blog.create({ title, content, tags, author, image });
  // await Blog.create({ title, content, tags, image });
  await Blog.create({ title, content, tags, image });

  res.status(201).json({
    status: "success",
    message: "Blog created successfully!",
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new AppError("No blog found with that ID", 404));
  }

  if (blog.author.toString() !== req.user.id) {
    return next(
      new AppError("You do not have permission to update this blog", 403)
    );
  }

  await Blog.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Blog Successfully Updated",
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new AppError("No blog found with that ID", 404));
  }

  if (blog.author.toString() !== req.user.id) {
    return next(
      new AppError("You do not have permission to delete this blog", 403)
    );
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Blog deleted Successfully!",
    blog,
  });
});

exports.getLatestSixBlogs = catchAsync(async (req, res) => {
  //   console.log(req.query);
  const sixBlog = await Blog.find().sort({ createdAt: -1 }).limit(6).lean();

  const formattedBlogs = sixBlog.map((blog) => ({
    ...blog,
    createdAt: blog.createdAt.toISOString().split("T")[0],
  }));
  res.status(200).render("home", {
    blogs: formattedBlogs,
  });
});
