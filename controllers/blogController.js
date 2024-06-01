const Blog = require("./../models/blogModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

exports.getAllBlogs = catchAsync(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json({
    message: "All Blogs returned",
    blogs,
    length: blogs.length,
  });
});

exports.getBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.status(200).json({
    blog: blog,
  });
});

exports.createBlog = catchAsync(async (req, res) => {
  const author = req.user._id;
  const { title, content, tags } = req.body;

  await Blog.create({ title, content, tags, author });

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
  const sixBlog = await Blog.find().sort({ createdAt: -1 }).limit(6);
  res.status(200).json({
    blog: sixBlog,
    length: sixBlog.length,
  });
});
