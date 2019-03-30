var bodyParser= require("body-parser");
var express =require("express");
mongoose =require("mongoose");
Attendance=require('./models/attendance.js');
Users=require('./models/users.js');
Feedback=require('./models/feedback.js');

var app=express();
//Database conn
mongoose.connect("mongodb://localhost/student_monitoring",{useNewUrlParser:true},function(err){
	if(err) throw err;
	console.log("Successfully connected");
	});

//App Config
app.set("view engine","ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




//student routings
app.get("/",(req,res)=>{
	res.render("enterattendance");
});
app.get("/enterattendance",(req,res)=>{
	Users.find(function(err,docs){

		res.render("enterattendance", {found:docs});
	});
	
});
app.post("/submitatt",(req,res)=>{

	allstu=req.body.select_attend;
	allsub=req.body.select_sub;
	Users.find(function(err,docs){

		for(i=0;i<docs.length;i++){
			Attendance.create({"name":docs[i].name, "attend":allstu[i], "subject":allsub[i]} , function(err,att){

				if(err){
					throw (err)
				}
		
		
				console.log('Added')
			})
		

		}
	});
	console.log(allstu);

})
/* app.post("/addattendance",(req,res,next)=>{
	
att=req.body.attend;
Name=req.body.name;	

Users=new Users();
Attendance.create({"name":Name, "attend":att} , function(err,att){

		if(err){
			throw (err)
		}


		return res.send('attendance added' + att);
	})

}) */

app.get("/checkattendance",(req,res)=>{
	  
	//id=req.Users.id;
	Attendance.find({name:"rahul"},function(err,docs){
		res.render("checkattendance",{found:docs});
		console.log(docs);
	});



		
		

	
});

app.get("/feedback",(req,res)=>{
	  
	//id=req.Users.id;
		res.render("feedback");
	
	});

	app.post("/feedsubmit",(req,res)=>{
	  
		//id=req.Users.id;
			
		feed= req.body.feed;
		describe= req.body.describe;

		Feedback.create({"feed": feed, "describe": describe}, function(err,fee){

			if(err){
				throw (err)
			}
	
	
			console.log('Added'+ fee);
			res.send("Database working!..");
		});
		
		});
app.listen(3001,function(){
	console.log("App is running on port 3001");
});