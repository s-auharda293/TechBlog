const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");
const express = require("express");

const router = express.Router();

router.route("/").get(viewController.getHome);
router.route("/signup").get(viewController.getSignUp);
router.route("/login").get(viewController.getLogIn);
router.route("/blogs").get(viewController.getAllBlogs);
router.route("/createBlog").get(viewController.createBlog);

module.exports = router;
