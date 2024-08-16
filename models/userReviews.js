const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviews = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reviewTitle: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Review = mongoose.model("Review", reviews);
module.exports = Review;