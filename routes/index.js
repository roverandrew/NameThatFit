var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
router.get("/", function(req, res){
    res.render("landing",);
});

//Register route. Show the form for username and password.
router.get("/signup", function(req,res){
	res.render("signup",{currentUser:req.user});
});
router.post("/signup", function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/signup");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "Welcome to Name That Fit " + user.username);
			res.redirect("/outfits");
		});
	});
});

//Login route. Show the form for username and password
router.get("/login", function(req,res){
	res.render("login", {currentUser:req.user});
});
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/outfits",
		failureRedirect: "/login"
	}), function(req,res){
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect('/outfits');
});

module.exports = router;
