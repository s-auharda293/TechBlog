const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");
const blogController = require("./../controllers/blogController");
const express = require("express");

const router = express.Router();

router.route("/").get(blogController.getLatestSixBlogs);
router.route("/signup").get(viewController.getSignUp);
router.route("/login").get(viewController.getLogIn);
router.route("/blogs").get(blogController.getAllBlogs);
router.route("/createBlog").get(viewController.createBlog);

module.exports = router;
