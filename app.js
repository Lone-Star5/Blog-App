const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_app");

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
	res.redirect("/blogs");
})
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err)
			console.log(err);
		else
			res.render("index", {blogs:blogs});
	})
})

app.get("/blogs/new", function(req, res){
	res.render("new");
})

app.post("/blogs", function(req, res){
	Blog.create(req.body.blog, function(err, newBlog){
		if(err)
			res.render("new")
		else
			res.redirect("/blogs");
	})
});



app.listen(3000, function(){
	console.log("Server Started ...")
});