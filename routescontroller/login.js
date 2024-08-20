const User = require("../models/userValidation.js");

module.exports.loginform = (req, res) => {
    return res.render("./userListings/userLogin.ejs");
};

module.exports.validlogin = async (req, res) => {
    req.flash("success", `Login Successful.`);
    return res.redirect("/JobHelper");
};

module.exports.signupform = (req, res, next) =>{
    return res.render("./userListings/userSignUp.ejs");
};

module.exports.newsignup = async (req, res, next) =>{
    let { listing: newuser, password } = req.body;
    const user = new User(newuser);
 
    const registeredUser = await User.register(user, password);
    
    req.login(registeredUser, (err) => {
        if(err){
            return next(err);
        }
        req.flash("success", `Welcome, ${registeredUser.username} to JobHelper!`);
        res.redirect("/JobHelper");
    });
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        
        if(err){
            return next(err);
        }
        req.flash("success", "Logout Successfully");
        res.redirect("/JobHelper/userListings/login");
    });
};