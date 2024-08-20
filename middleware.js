const { userSchema } = require("./joiSchema.js");
const User = require("./models/userValidation.js");
const ExpressError = require("./utilError/expressError.js");
module.exports.validateListing = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.isOwner = async(req, res, next) => {
    
    if(req.params.id != req.user._id){
        req.flash("error", "You Are Not The Owner Of This Listing, Not Access To Delete.");
        return res.redirect("/JobHelper");
    }else{
        next();     
    }
}
