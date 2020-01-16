var mongoose   = require("mongoose");
var Outfit = require("./models/outfit");
var Comment    = require("./models/comment");

var data = [
	{
		name: "Kanye West",
		image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-605722028-1517582045.jpg",
		description:"Yeezy season fall 2016 boots and top. Acne Jeans.",
		author:{
            id : "588c2e092403d111454fff76",
            username: "Calvin"
        }
	},
	{
		name: "Vincent Cassel",
		image:"https://media.gq-magazine.co.uk/photos/5d13a56d7fcc8e0cd3820de4/master/w_1440%2cc_limit/14-vincent-cassel-gq-16nov18_backgrid_b.jpg",
		description:"Tom ford fall 2018 pants.",
		 author:{
            id : "588c2e092403d111454fff71",
            username: "Andrew"
        }
	},
	{
		name: "Skepta",
		image:"https://media.gq-magazine.co.uk/photos/5d13a56f9a22c2f83f948fea/master/w_1440%2cc_limit/10-skepta-gq-16nov18_splash_b.jpg",
		description:"Pictured wearing a tactical vest and trousers. Brands undetermined.",
		 author:{
            id : "588c2e092403d111454fff77",
            username: "Giorgio"
        }
	}
]

//Remove outfits
// function seedDB(){
// 	Outfit.remove({},function(err){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			console.log("Succesfully removed all outfits!");
// 		}
// 		//Add a few outfits
// 		data.forEach(function(seed){
// 			Outfit.create(seed,function(err,outfit){
// 				if(err){
// 					console.log(err);
// 				} else{
// 					console.log("added an outfit");
//
// 				}
//
// 		});
// 	});
// 	});
// }


module.exports = seedDB;

//Add a few comments
