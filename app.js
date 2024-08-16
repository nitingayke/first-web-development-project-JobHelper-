const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); // Use To Define A template

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userValidation.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // Middleware to parse JSON request bodies

// ------------mongoDB server  -----------
const MONGO_URL = "mongodb://127.0.0.1:27017/JobHelpers";
main().then((res) => {
    console.log("Connect Successfully!");
}).catch((error) => {
    console.log("Connection Fail");
});
async function main(){
    await mongoose.connect(MONGO_URL);
}


const sessionOption = { 
    secret: "userloginidkey", 
    resave: false, 
    saveUninitialized: true,

    cookie: {
        expires: Date.now() + 24 * 60 * 60 * 1000,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model of LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const userloginRouter = require("./routes/logindata.js");
const updateRouter = require("./routes/updation.js");
const reviewRouter = require("./routes/reviews.js");
const listingRouter = require("./routes/userdata.js");

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.loginUser = req.user; // most important (locals) we can define variable here and access anywhere
    next();
});

app.use("/JobHelper/userListings", userloginRouter);

app.use("/JobHelper", (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error", "You need to be logged in first.");
        res.redirect("/JobHelper/userListings/Login");
    }
});

app.use("/JobHelper/update", updateRouter);
app.use("/JobHelper/reviews", reviewRouter);
app.use("/JobHelper", listingRouter);

// ----------------------------------------Errors and invalid path------------------------------------------------------------------------------------
app.get("*",(req, res) => {
    let error = "Page Does Not Found!";
    req.flash("error", "We couldn't find the page you were looking for. Please check the URL and try again.");
    res.redirect("/JobHelper");
});
app.use((err, req, res, next) =>{
    let { errorCode=505, message="Something Went Wrong"} = err;
    res.render("./errors/dbError.ejs", {error: message});
});
//  ----------------------------------------------starting website --------------------------------------------------------------------------------------
app.listen(8520, () => {
    console.log("App Has Been Started On Port: 8520");
});










// hw
/*
    comments part
    deletion (middleware mongoose)
*/