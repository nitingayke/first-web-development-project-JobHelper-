const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./userValidation.js");

const reviews = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    review: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Review = mongoose.model("Review", reviews);
module.exports = Review;