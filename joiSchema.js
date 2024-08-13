const joi = require("joi");

module.exports.userSchema = joi.object({
    listing: joi.object({
        username: joi.string().required(),
        email: joi.string().required(),
        mobileNo: joi.number().min(1000000000).max(9999999999).required(),
        role: joi.string().required(),
    }).required(),
    password: joi.string().min(8).max(15).required(),
});