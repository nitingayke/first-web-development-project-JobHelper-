const User = require("../models/userValidation");

module.exports.addfollow = async(req, res, next) => {
    let { id } = req.params;
 
    let followUser = await User.findById(id);
    let currLogin = await User.findById(req.user._id);

    followUser.profile.followers.push({user: currLogin});
    currLogin.profile.following.push({user: followUser});

    await followUser.save();
    await currLogin.save();

    req.flash("success", `started following to ${followUser.username}`);
    return res.redirect("/JobHelper");
};