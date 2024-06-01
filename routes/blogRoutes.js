const express = require("express");
const blogController = require("../controllers/blogController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, blogController.getAllBlogs)
  .post(blogController.createBlog);

router.route("/latest-6-blogs").get(blogController.getLatestSixBlogs);

router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
