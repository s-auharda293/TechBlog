const viewController = require("./../controllers/viewController");
const express = require("express");

const router = express.Router();

router.route("/").get(viewController.getHome);

module.exports = router;
