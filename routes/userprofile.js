const express = require("express");
const router = express.Router();
const listingController = require("../routescontroller/userprofile.js"); 
const wrapAsync = require("../utilError/errorHandling");

router.get("/", wrapAsync(listingController.editprofile));


module.exports = router;