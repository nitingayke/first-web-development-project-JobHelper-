const passport = require("passport");
const User = require("../models/userValidation");

module.exports.editprofile = async(req, res, next) => {
    res.render("./updatelistings/userprofile.ejs");
};

module.exports.updatedProfile = async(req, res, next) => {
    
    let id = req.user._id;
    let mainEditLst = req.body.editlisting;
    let userProfile = req.body.editprofile;

    let currUser = await User.findById(id);
    currUser.mobileNumber = mainEditLst.mobileNumber || currUser.mobileNumber;
    currUser.role = mainEditLst.role || currUser.role;
    currUser.profile.name = userProfile.name || currUser.profile.name;
    currUser.profile.headline = userProfile.headline || currUser.profile.headline;
    currUser.profile.location = userProfile.location || currUser.profile.location;

    let socialLnk = req.body.editsocialLinks;
    currUser.profile.socialLinks = {
        github: socialLnk.github || currUser.profile.socialLinks.github,
        linkedin: socialLnk.linkedin || currUser.profile.socialLinks.linkedin,
        discord: socialLnk.discord || currUser.profile.socialLinks.discord,
        facebook: socialLnk.facebook || currUser.profile.socialLinks.facebook,
    }

    currUser.profile.education = req.body.editeducation ? req.body.editeducation : currUser.profile.education;
    currUser.profile.experience = req.body.editexperience ? req.body.editexperience : currUser.profile.experience;
    currUser.profile.projects = req.body.editprojects ? req.body.editprojects : currUser.profile.projects;

    let user = await currUser.save();

    req.flash("success", "User data has been updated successfully.");
    return res.redirect(`/JobHelper/user/${id}`);
};

module.exports.updateUserImage = async(req, res, next) => {
    let id = req.user._id;
    let url = req.file.path;
    let filename = req.file.filename;
    let userimage = {url, filename} ;

    await User.findByIdAndUpdate(id, {"profile.profilePicture": userimage}, {new: true});
    req.flash("success", "User profile has been updated successfully.");
    return res.redirect(`/JobHelper/user/${id}`);
};

module.exports.deleteAccount = async(req, res, next) => {
    let { username } = req.body;

    if(req.user.username !== username){
        req.flash("error", "You are not the owner of this account.");
        return res.redirect("/JobHelper");

    }else{
        await User.deleteOne({username: username});
        req.logout();
        
        req.flash("success", "Account deleted successfully");
        res.redirect("/JobHelper/userListings/Login");
    }
};