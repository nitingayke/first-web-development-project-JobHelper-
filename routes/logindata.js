const express = require("express");
const router = express.Router();
const { userSchema } = require("../joiSchema.js");
const ExpressError = require("../utilError/expressError.js");
const wrapAsync = require("../utilError/errorHandling.js");
const passport = require("passport");
const User = require("../models/userValidation.js");

// --------------validation (joi)-------------
const validateListing = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

// user login
router.get("/login", (req, res) => {
    return res.render("./userListings/userLogin.ejs");
});

// Check Valid Login  validlogin (it will check the user login or not)
router.post("/validlogin", passport.authenticate("local", {failureRedirect: "/JobHelper/userListings/Login", failureFlash: true}) ,(async (req, res) => {
    req.flash("success", `Login Successful.`);
    return res.redirect("/JobHelper");
}));

router.get("/logout", (req, res) => {
    req.logout((err) => {
        
        if(err){
            return next(err);
        }
        req.flash("success", "Logout Successfully");
        res.redirect("/JobHelper/userListings/login");
    });
    
});

// user signin
router.get("/signup", (req, res, next) =>{
    return res.render("./userListings/userSignUp.ejs");
});

// Create new account
router.post("/signup", validateListing, wrapAsync(async (req, res, next) =>{
    let { listing: newuser, password } = req.body;

    let user = new User(newuser);
    User.register(user, password, (err, registeredUser) => {
        if(err){
            return next(err);
        }
        req.flash("success", `Welcome, ${registeredUser.username}, to JobHelper!`);
        res.redirect("/JobHelper");
    });
}));



module.exports = router;