const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");
const blogController = require("./../controllers/blogController");
const { requireAuth } = require("./../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

router.route("/").get(blogController.getLatestSixBlogs);
router.route("/signup").get(viewController.getSignUp);
router.route("/login").get(viewController.getLogIn);
router.route("/blogs").get(requireAuth, blogController.getAllBlogs);
router.route("/createBlog").get(requireAuth, viewController.createBlog);
router.route("/viewBlog/:slug").get(requireAuth, viewController.viewBlog);

module.exports = router;
