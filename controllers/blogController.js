const Blog = require("./../models/blogModel");
const catchAsync = require("./../utils/catchAsync");

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
  console.log(req.body);
  await Blog.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Blog created successfully!",
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Blog Successfully Updated",
  });
});

exports.deleteBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
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
