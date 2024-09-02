const Post = require("../models/postValidation.js");
const User = require("../models/userValidation.js");
const JobPost = require("../models/jobheaderimage.js");

module.exports.aboutpost = async(req, res, next) => {
    let { id } = req.params;
    let post = await Post.findById(id).populate("user");

    if(!post){
        req.flash("error", "Does Not Found Post!, Please Try Again.");
        return res.redirect(`/JobHelper/aboutPost/${id}`);
    }else{
        return res.render("./listings/editpost.ejs", {post});
    }
};

module.exports.postupdate = async (req, res, next) => {
    let { id } = req.params;
    let { title: newtitle } = req.body;
    
    let currPost = await Post.findById(id);
    if (!currPost) {
        req.flash("error", "No Post Found with the given ID.");
        return res.redirect(`/JobHelper/aboutPost/${id}`);
    }

    let updatedPost = {
        title: newtitle,
        imageLink: currPost.imageLink, 
    };

    if (req.file) {
        updatedPost.imageLink = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    let updated = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    if (!updated) {
        req.flash("error", "Failed to update the post.");
    } else {
        req.flash("success", "Update Successful! The post has been updated.");
    }
    return res.redirect(`/JobHelper/aboutPost/${id}`);
};

module.exports.deletepost = async(req, res, next) => {
    let { id } = req.params;
    let post = await Post.findByIdAndDelete(id);
    if(!post){
        req.flash("error", "No Post Found with the given ID.");
        return res.redirect(`/JobHelper/aboutPost/${id}`);
    }else{
        req.flash("success", "Deletion Successful! The post has been deleted.");
        return res.redirect("/JobHelper");
    }
};

module.exports.deleteaccount = async (req, res, next) => {
    let user = await User.findById("66b0eba61fba5085cbffaa5f");

    if(!user){
        req.flash("error", "Unable To Remove!, User Does Not Have Account.");
    }else{
        await User.findByIdAndDelete(req.user._id); // write here id (we have to create form to enter users data is valid user or chapari)
        req.flash("success", "Account Has Been Deleted Successfully.");
    }
    return res.redirect("/JobHelper/userListings/login");
};

module.exports.userContent = async(req, res, next) => {
    return res.render("./updatelistings/userContentEdit.ejs")
};

module.exports.addEducation = async(req, res, next) => {
    let education = req.body.education;
    let id = req.user._id;

    await User.findByIdAndUpdate(id, {$push: {"profile.education": education}}, {new: true});

    req.flash("success", "User profile has been updated successfully: Added new education section.");
    return res.redirect(`/JobHelper/user/${id}`);
}

module.exports.addSkill = async(req, res, next) => {
    let id = req.user._id;
    let skill = req.body.skill;
    await User.findByIdAndUpdate(id, {$push: {"profile.skills": skill}}, {new: true});

    req.flash("success", "User profile has been updated successfully: Added new skill.");
    return res.redirect(`/JobHelper/user/${id}`);
}

module.exports.addExperience = async(req, res, next) => {
    let id = req.user._id;
    let experience = req.body.experience;
    await User.findByIdAndUpdate(id, {$push: {"profile.experience": experience}}, {new: true});

    req.flash("success", "User profile has been updated successfully: Added new education section.");
    return res.redirect(`/JobHelper/user/${id}`);
}

module.exports.addProject = async(req, res, next) =>{
    let id = req.user._id;
    let project = req.body.project;
    await User.findByIdAndUpdate(id, {$push: {"profile.projects": project}}, {new: true});

    req.flash("success", "User profile has been updated successfully: Added one new project.");
    return res.redirect(`/JobHelper/user/${id}`);
};

module.exports.addCertificate = async(req, res, next) => {
    
    let id = req.user._id;
    let url = req.file.path;
    let filename = req.file.filename;
    let link = {url, filename} ;
    let { title } = req.body;
    let newCertificate = {title, link};

    console.log(newCertificate);
    await User.findByIdAndUpdate(id, {$push: {"profile.certifications": newCertificate}});

    req.flash("success", "User profile has been updated successfully: Added new certificate.");
    return res.redirect(`/JobHelper/user/${id}`);
}

module.exports.announceJob = async(req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let id = req.user._id;

    let announce = new JobPost({
        user: id,
        imageLink: { url, filename }
    })
    await announce.save();

    req.flash("success", `New Job Announce By ${req.user.username}`);
    return res.redirect("/JobHelper");
}
module.exports.deleteJob = async(req, res, next) => {
    let { id } = req.params;
    await JobPost.findByIdAndDelete(id);

    req.flash("success", "Remove Announce Job Successfully");
    return res.redirect("/JobHelper");
}