var express = require("express");
var router = express.Router();
var Outfit = require("../models/outfit")
var Comment = require("../models/comment")
var middleware = require("../middleware")

//INDEX - show all outfits
router.get("/", function(req, res){
    // Get all outfits from the database.
    Outfit.find({}, function(err, allOutfits){
       if(err){
           console.log(err);
       } else {
          res.render("outfits/index",{outfits:allOutfits});
       }
    });
});

//CREATE - add new outfit to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to outfits array
    var newName = req.body.name;
    var newImage = req.body.image;
    var newDesc = req.body.description;
	var newAuthor = {
		id: req.user._id,
		username: req.user.username
	}
    var newOutfit = {name: newName, image: newImage, description: newDesc, author:newAuthor};

    // Create a new outfit and save to DB
    Outfit.create(newOutfit, function(err, newlyCreated){
        if(err){
			req.flash("error", "Uh oh, something went wrong");
            console.log(err);
        } else {
            //redirect back to outfits page
            res.redirect("/outfits");
        }
    });
});

//NEW - show form to create new otufit. Specificity, before :id route is important.
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("outfits/new");
});

//SHOW - shows more info about one outfit
router.get("/:id", function(req, res){
    //find the outfit with provided ID
    Outfit.findById(req.params.id).populate("comments").exec(function(err, foundOutfit){
        if(err){
            console.log(err);
        } else {
            //render show template with that outfit
			console.log(foundOutfit);
            res.render("outfits/show", {outfit: foundOutfit});
        }
    });
});

//EDIT
router.get("/:id/edit", middleware.checkOutfitOwnership, function(req,res){
	//If a user is logged in, check if the id of the user mathes the id of the user who created the outfit.
	Outfit.findById(req.params.id, function(err,outfit){
		res.render("outfits/edit", {outfit: outfit})
	});
});

//UPDATE THEN REDIRECT(SEE YOUR CHANGES)
router.put("/:id", middleware.checkOutfitOwnership, function(req,res){
	//find and update the respective outfit
	Outfit.findByIdAndUpdate(req.params.id, req.body.outfit, function(err,newData){
		if(err){
			console.log(err);
			res.redirect("/outfits");
		} else{
			res.redirect("/outfits/" + newData._id);
		}
	});
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkOutfitOwnership, function(req,res){
	Outfit.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err);
			res.redirect("/outfits");
		} else{
			res.redirect("/outfits");
		}
	});
});


module.exports = router;
