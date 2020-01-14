var express     	      = require("express"),
    app         	      = express(),
    bodyParser  	      = require("body-parser"),
    mongoose    	      = require("mongoose"),
	Outfit  	            = require("./models/outfit"),
	Comment               = require("./models/comment"),
	User                  = require("./models/user"),
	flash                 = require("connect-flash"),
	passport    	        = require("passport"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	seedDB                = require("./seeds"),
	methodOverride        = require("method-override")

//requiring routes
var outfitRoutes     = require("./routes/outfits"),
    commentRoutes    = require("./routes/comments"),
	indexRoutes      = require("./routes/index")


//MISC VARIOUS REQUIREMENTS NEEDED
mongoose.connect("mongodb+srv://admin-andrew:Test123@cluster0-atrlj.mongodb.net/NameThatFitDB");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT REQUIREMENTS NEEDED
app.use(require("express-session")({
	secret: "we live in a simulation",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //encrypt
passport.deserializeUser(User.deserializeUser()); //decrypt

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error    =req.flash("error");
	res.locals.success  =req.flash("success");
	next();
});


seedDB(); //Seed the database

app.use("/outfits", outfitRoutes);
app.use("/outfits/:id/comments", commentRoutes);
app.use(indexRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
   console.log("Server has started succesfully!");
});
