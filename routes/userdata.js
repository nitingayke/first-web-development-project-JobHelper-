const express = require("express");
const router = express.Router();

const ExpressError = require("../utilError/expressError.js");
let wrapAsync = require("../utilError/errorHandling.js");
const User = require("../models/userValidation.js");
const Post = require("../models/postValidation.js");
const Review = require("../models/userReviews.js");
const JobPost = require("../models/jobheaderimage.js");

// Home Page Router
router.get("/", wrapAsync (async (req, res, next)=> {
    let posts = await Post.find({}).populate("user").populate({path: "comments.user", select: "_id email profile.profilePicture profile.headline"});
    let jobposts = await JobPost.find({});
   
    return res.render("./listings/index.ejs", { posts, jobposts });// start over here
}));

// update likes
router.patch("/likes/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let currPost = await Post.findById(id);
    if(!currPost){
        let error = "Post Not Found";
        throw new ExpressError(404, error);
    }

    currPost.likes += 1;
    await currPost.save();
    res.json({ success: true, newLikes: currPost.likes}); // Send the new likes count back to the client
}));

// new post
router.post("/newPost/:id", wrapAsync ( async (req, res, next) =>{
    let { id } = req.params;
    let { title, imageURL } = req.body;
    await User.findById(id);

    let newPost = new Post({
        user: await User.findById(id),
        title: title,
        imageLink: imageURL,
    });
    await newPost.save();

    req.flash("success", "New Post Has Been Created!");
    return res.redirect("/JobHelper");
}));

// posted post
router.get("/aboutPost/:id", wrapAsync( async(req, res, next) =>{
    let { id } = req.params;

    let post = await Post.findById(id).populate("user").populate({path: "comments.user", select: "_id email profile.profilePicture profile.headline" });

    if(!post){
        req.flash("error", "Post Does Not Found!");
        res.redirect("/JobHelper");
    }else{
        res.render("./listings/aboutPost.ejs", { post });
    }
}));

// special user
router.get("/user/:id", wrapAsync(async (req, res, next) =>{
    let { id } = req.params;
    let userData = await User.findById(id)
        .populate({path: "profile.followers.user" , select: "_id email profile.profilePicture profile.headline"})
        .populate({path: "profile.following.user" , select: "_id email profile.profilePicture profile.headline"})
        .populate({
            path: "profile.reviews",
            populate: {
                path: "user", // Populate the user field inside the Review model
                select: "_id email profile.profilePicture profile.headline"
            },
            select: "reviewTitle rating" // Select fields from the Review model
        });

    console.log(userData.profile.reviews);
    let posts = await Post.find({ user: id}).populate("user").populate({path: "comments.user", select: "_id email profile.profilePicture profile.headline" });
   
    if(!userData){
        req.flash("error", "User Does Not Have An Account!");
        res.redirect("/JobHelper");
    }else{
        res.render("./listings/aboutUser.ejs", {user: userData, posts});
    }
}));

// add new comment
router.post("/comment/:id", wrapAsync(async(req, res) => {
    let { id } = req.params;
    let title = req.body.title;

    let newComment = {
        user: req.user._id,
        comment: title,
        createAt: Date(),
    }
    let postdata = await Post.findByIdAndUpdate(id, {$push: {comments: newComment}}, {new: true}).populate("user");
    req.flash("success", `A new comment has been posted to ${postdata.user.username}'s post.`);
    return res.redirect("/JobHelper");
}));

// Delete Route
router.delete("/post/:postid/comment/:commentid", wrapAsync( async(req, res) => {
    let { postid, commentid } = req.params;

    await Post.findByIdAndUpdate(postid, {$pull: {comments: {_id: commentid}}}, {new: true});
    req.flash("success", "Comment Has Been Deleted..");
    return res.redirect("/JobHelper");
}));

module.exports = router;
