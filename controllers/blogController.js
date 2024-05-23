const Blog = require("./../models/blogModel");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      message: "All Blogs returned",
      blogs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err._message,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      blog: blog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err._message,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    console.log(req.body);
    await Blog.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Blog created successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err._message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Blog Successfully Updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err._message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Blog deleted Successfully!",
      blog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something Went Wrong!!!💥",
    });
  }
};
exports.getLatestSixBlogs = async (req, res) => {
  //   console.log(req.query);
  const sixBlog = await Blog.find().sort({ createdAt: -1 }).limit(6);
  try {
    res.status(200).json({
      blog: sixBlog,
      length: sixBlog.length,
    });
  } catch (err) {
    console.log(err);
  }
};
