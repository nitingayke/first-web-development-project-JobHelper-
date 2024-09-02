const Post = require("../models/postValidation.js");
const User = require("../models/userValidation.js");


module.exports.removeEducation = async(req, res, next) => {
    let userId = req.user._id;
    let { id } = req.params;
    await User.findByIdAndUpdate(userId, {$pull: {"profile.education": {_id: id}}}, {new: true});

    req.flash("success", "Profile data has been updated! deleted education section.");
    return res.redirect("/JobHelper/update/user-content");
};

module.exports.removeSkill = async(req, res, next) => {
    let userId = req.user._id;
    let { index } = req.params;
    
    let user = await User.findById(userId);

    if(!user){
        req.flash("success", "user not found");
        return res.redirect("/JobHelper");
    }else{
        user.profile.skills.splice(index, 1);
        await user.save();

        req.flash("success", "Profile data has been updated! deleted education section.");
        return res.redirect("/JobHelper/update/user-content");
    }
};

module.exports.removeExperience = async(req, res, next) => {
    let userId = req.user._id;
    let { id } = req.params;
    await User.findByIdAndUpdate(userId, {$pull: {"profile.experience": {_id: id}}}, {new: true});

    req.flash("success", "Profile data has been updated! deleted experience section.");
    return res.redirect("/JobHelper/update/user-content");
};

module.exports.removeProject = async(req, res, next) => {
    let userId = req.user._id;
    let { id } = req.params;
    await User.findByIdAndUpdate(userId, {$pull: {"profile.projects": {_id: id}}}, {new: true});

    req.flash("success", "Profile data has been updated! deleted project section.");
    return res.redirect("/JobHelper/update/user-content");
};

module.exports.removeCertificate = async(req, res, next) => {
    let userId = req.user._id;
    let { id } = req.params;
    await User.findByIdAndUpdate(userId, {$pull: {"profile.certifications": {_id: id}}}, {new: true});

    req.flash("success", "Profile data has been updated! deleted certificate section.");
    return res.redirect("/JobHelper/update/user-content");
};