const Review = require("../models/userReviews");
const User = require("../models/userValidation");

module.exports.newreview = async(req, res, next) => {
    let { id } = req.params;
  
    if(id == req.user._id){
        req.flash("error", "You are not authorized to review your account.");
    }else{
        let newReview = new Review(req.body.review);
        newReview.user = req.user._id;
        
        await newReview.save();
        let user = await User.findByIdAndUpdate(id, {$push: {"profile.reviews": newReview._id}}, {new: true});
        req.flash("success", `new review added to ${user.username}`);
    }
    return res.redirect(`/JobHelper/user/${id}`);
};

module.exports.deletereview = async(req, res, next) => {
    let { reviewid, id } = req.params;
    await Review.findByIdAndDelete(reviewid);
    await User.findByIdAndUpdate(id, {$pull: {"profile.reviews": reviewid}}, {new: true});
    
    req.flash("success", "Review deleted successfully.");
    return res.redirect(`/JobHelper/user/${id}`);
}