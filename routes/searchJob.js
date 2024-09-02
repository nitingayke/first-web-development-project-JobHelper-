const express = require("express");
const router = express.Router();
const listingController = require("../routescontroller/searchJob.js");
const wrapAsync = require("../utilError/errorHandling.js");

router.get("/recent-jobs", wrapAsync(listingController.searchJobs));

router.get("/new-posted-job", wrapAsync(listingController.newPostedJob));

module.exports = router;