const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./userReviews.js");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
    }, 
    mobileNumber:{
        type: String,
    },
    role:{
        type: String, // e.g., employee, student, freelancer
    },
    profile: {
        name: String,
        headline: String, // Short description or headline
        location: String, 
        profilePicture: {
            url: String,
            filename: String,
        }, // URL or path to profile picture
        skills: [String], // List of skills

        education: [
            {
                institution: String,
                degree: String,
                fieldOfStudy: String,
                duration: String // e.g., 2017 - 2021
            }
        ],
        experience: [
            {
                title: String,
                company: String,
                duration: String, // e.g., Jan 2020 - Present
                description: String
            }
        ],
        socialLinks: {
            linkedin: String,
            github: String,
            discord: String,
            facebook: String,
        },
        projects: [
            {
                title: String,
                description: String,
                technologies: String,
                link: String,
            }
        ],
        certifications: [
            {
                title: String,
                link: {
                    url: String,
                    filename: String,
                }
            }
        ],
        //--------------------Reference---------------------
        followers: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        following: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            }
        ],
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            }
        ],
    },
},{
    timestamps: true,
});


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;