const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilError/errorHandling.js");
const passport = require("passport");
const User = require("../models/userValidation.js");
const { validateListing } = require("../middleware.js");
const listingController = require("../routescontroller/login.js");

router.route("/login")
    .get(listingController.loginform)
    .post(passport.authenticate("local", { failureRedirect: "/JobHelper/userListings/Login", failureFlash: true }), listingController.validlogin);

router.get("/logout", listingController.logout);

router.route("/signup")
    .get(listingController.signupform)
    .post(validateListing, wrapAsync(listingController.newsignup));


module.exports = router;