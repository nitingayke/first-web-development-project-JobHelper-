const express = require("express");
const router = express.Router();
const Post = require("../models/postValidation.js");
const User = require("../models/userValidation.js");
const wrapAsync = require("../utilError/errorHandling.js");
const listingController = require("../routescontroller/updations.js");

const { storage } = require("../cloudConfig2.js");
const multer = require("multer");
const upload = multer({ storage });

router.route("/post/:id")
    .get(wrapAsync(listingController.aboutpost))
    .post( upload.single("imageLink"), wrapAsync(listingController.postupdate));

router.delete("/deletepost/:id", wrapAsync(listingController.deletepost));

router.delete("/removeaccount", wrapAsync(listingController.deleteaccount));

router.get("/user-content", wrapAsync(listingController.userContent));

router.post("/add-education", wrapAsync(listingController.addEducation));

router.post("/add-skills", wrapAsync(listingController.addSkill));

router.post("/add-experience", wrapAsync(listingController.addExperience));

router.post("/add-project", wrapAsync(listingController.addProject));

router.post("/add-certificate",upload.single("certificatelink"), wrapAsync(listingController.addCertificate));

module.exports = router;