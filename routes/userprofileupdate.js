const express = require("express");
const wrapAsync = require("../utilError/errorHandling");
const router = express.Router();
const listingController = require("../routescontroller/userprofileupdate.js");

router.post("/:id", wrapAsync(listingController.addfollow));

module.exports = router;