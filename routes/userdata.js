const express = require("express");
const router = express.Router();
let wrapAsync = require("../utilError/errorHandling.js");
const listingController = require("../routescontroller/userdata.js");

const { storage } = require("../cloudConfig2.js");
const multer = require("multer");
const upload = multer({ storage });


// Home Page Router
router.get("/", wrapAsync (listingController.homepage));

// update likes
router.patch("/likes/:id", wrapAsync(listingController.postlike));

// new post
router.post("/newPost/:id", upload.single("imageURL"), wrapAsync(listingController.newpost));

// posted post
router.get("/aboutPost/:id", wrapAsync(listingController.userpost));

// special user
router.get("/user/:id", wrapAsync(listingController.aboutuser));

// add new comment
router.post("/comment/:id", wrapAsync(listingController.postcomment));

// Delete Route
router.delete("/post/:postid/comment/:commentid", wrapAsync(listingController.removecomment));

module.exports = router;
