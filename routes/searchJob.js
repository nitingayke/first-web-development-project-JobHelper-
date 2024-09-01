const express = require("express");
const router = express.Router();
const listingController = require("../routescontroller/searchJob.js");
const wrapAsync = require("../utilError/errorHandling.js");

router.get("/recent-jobs", wrapAsync(listingController.searchJobs));

module.exports = router;