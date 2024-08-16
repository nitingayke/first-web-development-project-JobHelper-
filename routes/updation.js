const express = require("express");
const router = express.Router();
const Post = require("../models/postValidation.js");
const User = require("../models/userValidation.js");
const wrapAsync = require("../utilError/errorHandling.js");

router.get("/post/:id", wrapAsync(async(req, res, next) => {
    let { id } = req.params;
    let post = await Post.findById(id).populate("user");
    
    if(!post){
        req.flash("error", "Does Not Found Post!, Please Try Again.");
        res.redirect(`/JobHelper/aboutPost/${id}`);
    }else{
        res.render("./listings/editpost.ejs", {post});
    }
}));
// update post
router.post("/post/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let { imageLink: newimageLink, title: newtitle } = req.body;
    let user = await Post.findByIdAndUpdate(id, {$set: {imageLink: newimageLink, title: newtitle}});
    if(!user){
        req.flash("error", "No Post Found with the given ID.");
    }else{
        req.flash("success", "Update Successful! The post has been updated.");
    }
    res.redirect(`/JobHelper/aboutPost/${id}`);
}));

// delete post 
router.delete("/deletepost/:id", wrapAsync(async(req, res, next) => {
    let { id } = req.params;
    let post = await Post.findByIdAndDelete(id);
    if(!post){
        req.flash("error", "No Post Found with the given ID.");
        res.redirect(`/JobHelper/aboutPost/${id}`);
    }else{
        req.flash("success", "Deletion Successful! The post has been deleted.");
        res.redirect("/JobHelper");
    }
}));

// remove account
router.delete("/removeaccount", wrapAsync (async (req, res, next) => {
    let user = await User.findById("66b0eba61fba5085cbffaa5f");

    if(!user){
        req.flash("error", "Unable To Remove!, User Does Not Have Account.");
    }else{
        await User.findByIdAndDelete(""); // write here id
        req.flash("success", "Account Has Been Deleted Successfully.");
        res.redirect("/JobHelper");
    }
}));

module.exports = router;