const mongoose = require("mongoose");
const User = require("../models/userValidation.js");
const Post = require("../models/postValidation.js");
const JobPost = require("../models/jobheaderimage.js");
// let user = new User({
//     name: "Nitin Valmik Gayke",
//     email: "gaykenitin975@gmail.com",
//     mobileNumber: "9209143657",
//     role: "Student",
//     password: "gaykenitin@9209",
//     profile: {
//         username: "gaykenitin",
//         headline: "Aspiring Software Internship || Java || SQL || FrontEnd, BackEnd & DataBase || Data Structure And Algorighm",
//         location: "fadol mala ambad nashik, Maharashtra",
//         profilePicture: "https://assets.leetcode.com/users/Nitin_Gayke/avatar_1721416810.png",
//     }
// });

const MONGO_URL = "mongodb://127.0.0.1:27017/JobHelpers";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connection Successfull");
    })
    .catch((err) => {
        console.log("Connection Fail");
    });

// const inserData = async() => {
//     try {
//         let res = await user.save();
//         console.log(res);
//     } catch (error) {
//         console.log(error);
//     }
// }
// inserData();

// const Post = require("../models/postValidation.js");
// let post = new Post({
//     title: "Hi connections! I'm excited to share that I've recently completed the 100 Days Badge Challenge on LeetCode! 🎉 This journey has been very rewarding and has taught me a lot about staying consistent, solving problems, and learning every day. I'm looking forward to more challenges and continuing my journey of learning and growth. Happy coding! 💻✨ #100DaysOfCode #LeetCode #DSA #CodingJourney #Learning",
//     imageLink: "https://res.cloudinary.com/practicaldev/image/fetch/s--tg8umzlH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dwhvparfxsd6prg1jvfc.png",
//     likes: 56,
// });

// const insertPost = async() => {
//     let postUser = await User.findOne({email: "gaykenitin975@gmail.com"});
//     post.user = postUser;

//     let res = await post.save();
//     console.log(res);
// }
// insertPost();

// const addComment = async() => {

//     let commentTitle = "Congratulation nitin, your journey is so exicited.";
//     let userRef = await User.findById("66b0f5b5ed135fb27f719504");

//     let newComment = {
//         user: userRef,
//         comment: commentTitle,
//     }

//     let pst = await Post.findByIdAndUpdate('66b0ed7a62236e88349c01aa', {$push: {comments: newComment}}, {new: true});
//     console.log(pst);
// }

// addComment();

const updateData = async () => {

    // let edu = {
    //     institution: "Sandip University Nashik, Maharashtra",
    //     degree: "bachelor of technology (B-Tech)",
    //     fieldOfStudy: "Computer Science & Engg",
    //     duration: "2022 - 2026", 
    // }


    let user = await User.findById("66bd92705d84305cc7d27c87");
    // let user2 = await User.findById("66b0f5b5ed135fb27f719504");
    // let usr = {
    //     user: user2,
    // }
    // user.profile.following.push(usr);
    // user.profile.socialLinks.linkedin = "https://www.linkedin.com/in/nitin-gayke92",
    // user.profile.socialLinks.github = "https://github.com/nitingayke",

    // user.profile.username = "gaykenitin92",
    // user.profile.headline = "Aspiring Software Internship || Java || SQL || FrontEnd, BackEnd & DataBase || Data Structure And Algorighm",
    // user.profile.location = "fadol mala ambad nashik, Maharashtra",
    // user.profile.profilePicture = "https://assets.leetcode.com/users/Nitin_Gayke/avatar_1721416810.png";
    // user.profile.skills.push("C++");
    // user.profile.skills.push("Java");
    // user.profile.skills.push("DSA");
    // user.profile.skills.push("Node.js");
    // user.profile.skills.push("HTML");
    // user.profile.skills.push("CSS");
    // user.profile.skills.push("JavaScript");
    // user.profile.skills.push("Express.js");
    // user.profile.skills.push("MongoDB");
    // user.profile.skills.push("SQL");

    let edu = {
        institution: "Sandip University Nashik",
        degree: "Bachelor Of Technology (B-Tech)",
        fieldOfStudy: "Computer Science & Engineering",
        duration: "2022-2026",
    }
    user.profile.education.push(edu);
    await user.save();
    console.log(user);
}

// updateData();

// const insertImage = async() => {

//     let jobposts = new JobPost({
//         user: await User.findById("66b0eba61fba5085cbffaa5f"),
//         imageLink: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/we-are-hiring-linkedin-banner-design-template-849b7e760d0e7b89aef0078ba5ac1ea7_screen.jpg?ts=1618937264",
//     });
//     let post = await jobposts.save();

//     console.log(post);
// }

// insertImage();

// const updatePosts = async(req, res) => {
//     let post = await Post.findByIdAndUpdate("66bd92ed5d84305cc7d27c94", {$set: {comments: []}}, {new: true});

//     console.log(post);
// }
// updatePosts();

function insertnewdata() {
    let userdata = {
        profile: {
            skills: [
                'C++', 'Java',
                'DSA', 'Node.js',
                'HTML', 'CSS',
                'JavaScript', 'Express.js',
                'MongoDB', 'SQL'
            ],
            education: [
                {
                    institution: 'Sandip University Nashik',
                    degree: 'Bachelor Of Technology (B-Tech)',
                    fieldOfStudy: 'Computer Science & Engineering',
                    duration: '2022-2026'
                },
                {
                    institution: 'KVN Naik College Jategaon',
                    degree: '',
                    fieldOfStudy: '11th and 12th',
                    duration: '2020-2022'
                }
            ],
            experience: [
                {
                    title: 'Software Engineer Intern',
                    company: 'Tech Solutions Ltd.',
                    duration: 'June 2022 - August 2022',
                    description: 'Worked on developing and maintaining web applications using Node.js and Express. Collaborated with a team of developers to implement new features, optimize existing code, and ensure the smooth functioning of the product. Gained experience in backend development and database management.'
                }
            ],
            projects: [
                {
                    title: 'Airbnb Clone Project',
                    description: 'Developed a full-stack clone of Airbnb, including features like property listings, user authentication etc.',
                    technologies: [],
                    link: 'https://github.com/nitingayke/airbnb-webproject'
                }
            ],

            headline: 'Aspiring Software Internship || Java || SQL || FrontEnd, BackEnd & DataBase || Data Structure And Algorighm',
            location: 'fadol mala ambad nashik, Maharashtra',
            profilePicture: {
                url: 'https://res.cloudinary.com/dnpg99izj/image/upload/v1724739401/jobhelper/ro262neunom1tqwek5ta.jpg',
                filename: 'jobhelper/ro262neunom1tqwek5ta'
            },
            socialLinks: {
                linkedin: 'https://www.linkedin.com/in/nitin-gayke92',
                github: 'https://github.com/nitingayke'
            },
            name: 'Nitin Valmik Gayke'
        },
    } 
}
