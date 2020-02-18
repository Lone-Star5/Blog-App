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

// Blog.create({
// 	title: "Test Blog",
// 	image: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	body: "Hello This is Blog Post"
// });

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




app.listen(3000, function(){
	console.log("Server Started ...")
});