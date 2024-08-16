const { userSchema } = require("./joiSchema.js");
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