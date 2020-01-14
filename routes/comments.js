var express = require("express");
var router = express.Router({mergeParams:true});
var Outfit = require("../models/outfit")
var Comment = require("../models/comment")
var middleware = require("../middleware")

//NEW
router.get("/new", middleware.isLoggedIn, function(req,res){
	//find the outfit with provided ID
    Outfit.findById((req.params.id), function(err,outfit){
		 if(err){
            console.log(err);
        } else {
			//Render the new comment form and send the information of the associated outfit to it. So it knows where to submit to.
            res.render("comments/new", {outfit: outfit});
		}
	});
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req,res){
	//Lookup outfit using ID
	Outfit.findById(req.params.id, function(err,outfit){
		if(err){
			console.log(err);
			res.redirect("/outfits")
		} else {
			//Create new comment
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					req.flash("error", "Uh oh, something went wrong");
					console.log(err);
				} else{
					//add username to comment. Due to isLoggedIn,there will always be a user if execution of  the code gets to here.
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					outfit.comments.push(comment);
					outfit.save();
					req.flash("success", "Succesfully added comment");
					res.redirect('/outfits/' + outfit._id);
				}
			})
		}
	});
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else{
				res.render("comments/edit", {outfit_id:req.params.id, comment:foundComment});
		}
	})
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			console.log(err);
			res.redirect("/outfits")
		} else{
			res.redirect("/outfits/" + req.params.id);
		}
	})
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("/back");
		} else{
			req.flash("success", "Comment deleted");
			res.redirect("/outfits/" + req.params.id);
		}
	})
})

module.exports = router;
