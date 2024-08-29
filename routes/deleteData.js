const express = require("express");
const router = express.Router();
const User = require("../models/userValidation.js");
const wrapAsync = require("../utilError/errorHandling.js");
const listingController = require("../routescontroller/deleteuserdata.js");

router.delete("/remove-education/:id", listingController.removeEducation);

router.delete("/remove-skill/:index", listingController.removeSkill);

router.delete("/remove-experience/:id", listingController.removeExperience);

router.delete("/remove-project/:id", listingController.removeProject);

router.delete("/remove-certificate/:id", listingController.removeCertificate);


module.exports = router;