var Outfit = require("../models/outfit")
var Comment = require("../models/comment")
var middlewareObj = {};

middlewareObj.checkOutfitOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Outfit.findById(req.params.id, function(err,outfit){
			if(err){
				req.flash("error", "Outfit not found");
				console.log(err);
				res.redirect("back");
			} else{
				//Does the user own this outfit submission?
				if(outfit.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error", "Must be logged in to do that!");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,comment){
			if(err){
				console.log(err);
				res.redirect("back");
			} else{
				//Does the user own this comment?
				if(comment.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error", "Must be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "Must be logged in to do that!");
    res.redirect("/login");
};


module.exports = middlewareObj
