const express = require("express");
const router = express.Router();
const listingController = require("../routescontroller/userprofile.js");
const wrapAsync = require("../utilError/errorHandling");
const { isListingOwner } = require("../middleware.js");

const { storage } = require("../cloudConfig2.js");
const multer = require("multer");
const passport = require("passport");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.editprofile))
    .post(wrapAsync(listingController.updatedProfile));


router.post("/userpicture/:id", isListingOwner, upload.single("profilePicture"), wrapAsync(listingController.updateUserImage));

router.delete("/removeaccount", passport.authenticate("local", { failureRedirect: "/JobHelper", failureFlash: true }), wrapAsync(listingController.deleteAccount));


module.exports = router;