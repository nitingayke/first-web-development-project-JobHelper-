const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./userValidation.js");

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    imageLink: {
        url: String,
        filename: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            createAt: Date,
        }
    ],
},{
    timestamps: true,
});


const Post = mongoose.model("Post", postSchema);
module.exports = Post;
