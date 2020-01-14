var mongoose = require("mongoose");
var Comment    = require("./comment");

// SCHEMA SETUP
var outfitSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author:{
	   id:{
		   type:mongoose.Schema.Types.ObjectId,
		   ref: "User"
	   },
   username: String
   },
   comments: [
	   {
		   type:mongoose.Schema.Types.ObjectId,
		   ref:"Comment"
	   }
   ]
});

module.exports = mongoose.model("Outfit", outfitSchema);
