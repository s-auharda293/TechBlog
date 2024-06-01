const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/").get(userController.getUser);
router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.logIn);

module.exports = router;
