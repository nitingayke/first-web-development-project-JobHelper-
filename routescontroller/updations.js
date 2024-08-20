const Post = require("../models/postValidation.js");
const User = require("../models/userValidation.js")

module.exports.aboutpost = async(req, res, next) => {
    let { id } = req.params;
    let post = await Post.findById(id).populate("user");

    if(!post){
        req.flash("error", "Does Not Found Post!, Please Try Again.");
        res.redirect(`/JobHelper/aboutPost/${id}`);
    }else{
        res.render("./listings/editpost.ejs", {post});
    }
};

module.exports.postupdate = async (req, res, next) => {
   
    let { id } = req.params;
    let { title: newtitle } = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    
    let user = await Post.findByIdAndUpdate(id, {$set: {imageLink: {url, filename}, title: newtitle}});
    if(!user){
        req.flash("error", "No Post Found with the given ID.");
    }else{
        req.flash("success", "Update Successful! The post has been updated.");
    }
    res.redirect(`/JobHelper/aboutPost/${id}`);
};

module.exports.deletepost = async(req, res, next) => {
    let { id } = req.params;
    let post = await Post.findByIdAndDelete(id);
    if(!post){
        req.flash("error", "No Post Found with the given ID.");
        res.redirect(`/JobHelper/aboutPost/${id}`);
    }else{
        req.flash("success", "Deletion Successful! The post has been deleted.");
        res.redirect("/JobHelper");
    }
};

module.exports.deleteaccount = async (req, res, next) => {
    let user = await User.findById("66b0eba61fba5085cbffaa5f");

    if(!user){
        req.flash("error", "Unable To Remove!, User Does Not Have Account.");
    }else{
        await User.findByIdAndDelete(req.user._id); // write here id (we have to create form to enter users data is valid user or chapari)
        req.flash("success", "Account Has Been Deleted Successfully.");
        res.redirect("/JobHelper/userListings/login");
    }
};