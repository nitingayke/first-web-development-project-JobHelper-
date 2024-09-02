const JobPost = require("../models/jobheaderimage.js");
const Post = require("../models/postValidation.js");
const User = require("../models/userValidation.js");
const ExpressError = require("../utilError/expressError.js");

module.exports.homepage = async (req, res, next)=> {
    let posts = await Post.find({}).populate("user").populate({path: "comments.user", select: "_id email profile.profilePicture profile.headline"});
    let jobposts = await JobPost.find({});
   
    return res.render("./listings/index.ejs", { posts, jobposts });// start over here
};

module.exports.searchQuery = async(req, res, next) => {
    let query = req.query.query;

    let users = await User.find({username: query});

    return res.render("./listings/users.ejs", { users });
};

module.exports.newpost = async (req, res, next) =>{
    let { id } = req.params;
    let { title } = req.body;

    let url = req.file.path;
    let filename = req.file.filename;
    

    let newPost = new Post({
        user: await User.findById(id),
        title: title,
        imageLink: {url, filename},
    });
    await newPost.save();

    req.flash("success", "New Post Has Been Created!");
    return res.redirect("/JobHelper");
};

module.exports.postlike = async (req, res, next) => {
    let { id } = req.params;
    let currPost = await Post.findById(id);
    if(!currPost){
        let error = "Post Not Found";
        throw new ExpressError(404, error);
    }
    let userId = req.user._id;
    if(userId){
        currPost.likes.push(userId);
        await currPost.save();
    }
    res.json({ success: true, newLikes: currPost.likes.length}); // Send the new likes count back to the client
};

module.exports.userpost = async(req, res, next) =>{
    let { id } = req.params;

    let post = await Post.findById(id).populate("user").populate({path: "comments.user", select: "_id email profile.profilePicture profile.headline" });

    if(!post){
        req.flash("error", "Post Does Not Found!");
        return res.redirect("/JobHelper");
    }else{
        return res.render("./listings/aboutPost.ejs", { post });
    }
};

module.exports.aboutuser = async (req, res, next) =>{
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
        
    let posts = await Post.find({ user: id}).populate("user").populate({path: "comments.user", select: "_id email profile.profilePicture profile.headline" });
   
    if(!userData){
        req.flash("error", "User Does Not Have An Account!");
        return res.redirect("/JobHelper");
    }else{
        return res.render("./listings/aboutUser.ejs", {user: userData, posts});
    }
};

module.exports.postcomment = async(req, res) => {
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
};

module.exports.removecomment = async(req, res) => {
    let { postid, commentid } = req.params;

    await Post.findByIdAndUpdate(postid, {$pull: {comments: {_id: commentid}}}, {new: true});
    req.flash("success", "Comment Has Been Deleted..");
    return res.redirect("/JobHelper");
};