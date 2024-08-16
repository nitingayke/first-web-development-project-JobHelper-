const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilError/errorHandling.js");
const User = require("../models/userValidation.js");
const Review = require("../models/userReviews.js");
const { route } = require("./userdata.js");

// new review route
router.post("/:id", wrapAsync( async(req, res, next) => {
    let { id } = req.params;
    let newReview = new Review(req.body.review);
    newReview.user = req.user._id;
    
    await newReview.save();
    let user = await User.findByIdAndUpdate(id, {$push: {"profile.reviews": newReview._id}}, {new: true});
    req.flash("success", `new review added to ${user.username}`);
    res.redirect(`/JobHelper/user/${id}`);
}));
// review delete


module.exports = router;

