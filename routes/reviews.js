const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilError/errorHandling.js");
const User = require("../models/userValidation.js");
const Review = require("../models/userReviews.js");
const listingController = require("../routescontroller/reviews.js");
const { isOwner } = require("../middleware.js");

// new review route
router.post("/:id", wrapAsync(listingController.newreview));

// review delete
router.delete("/:reviewid/delete/:id", wrapAsync(listingController.deletereview));

module.exports = router;

