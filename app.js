var express= require("express");
var app= express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.get("/",function(req,res){
	res.render("index");		
});
app.get("/my-grades",function(req,res){
	res.render("mygrades");		
});
app.get("/attendance",function(req,res){
	res.render("attendance");		
});
app.get("/fill-exam-form",function(req,res){
	res.render("examform");		
});
app.get("/feedback",function(req,res){
	res.render("feedback");		
});
app.get("/settings",function(req,res){
	res.render("settings");		
});
app.listen(3000,function(){
	console.log("app is running on port 3000");
	
});