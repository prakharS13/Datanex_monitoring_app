var bodyParser= require("body-parser"),
express =require("express"),
mongoose =require("mongoose"),
passport=require("passport"),
passportLocal=require("passport-local"),
passportMongoose=require("passport-local-mongoose"),
student=require("./models/student"),
User=require("./models/user"),
teacher=require("./models/teacher"),
expressSession=require("express-session"),
unirest = require("unirest"),
nodemailer = require('nodemailer'),
flash=require('connect-flash');


var app=express();
var request = unirest("POST", "https://www.fast2sms.com/dev/bulk");
//Database conn
/* mongoose.connect("mongodb://codehank:abc123456@ds111771.mlab.com:11771/student_monitoring",{useNewUrlParser:true},function(err){
	if(err) throw err;
	console.log("Successfully connected");
	}); */
	mongoose.connect("mongodb://localhost:27017/student_monitoring",{useNewUrlParser:true},function(err){
	if(err) throw err;
	console.log("Successfully connected");
	});
	
//Session config	
app.use(require("express-session")({  
			secret: "Prakhar is hacker",
			resave:true,
			saveUninitialize:true
	}));
	
	
//App Config
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public")); 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
	
passport.use(new passportLocal(
  function(username, password, done) {
      User.findOne({
        username: username
      }, function(err, user) {    
        if (err) {
          return done(err);
        }

        if (!user) {
		return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
	    data=user.id;
        return done(null, user);
      });
  }
));
//
//student routings
app.get("/",(req,res)=>{
	res.render("login");
	
	
});
app.post("/forgot-password",(req,res)=>{
	roll=req.body.username;
	student.findOne({rollno:roll},function(err,docs){
		console.log(docs.phone+" "+docs.password+"  "+docs.email);
		
		request.headers({
			"content-type": "application/x-www-form-urlencoded",
		  "cache-control": "no-cache",
		  "authorization": "uvsRUkobrVMjdCXFmBKG128hWiEJawZlzY569cLqAOQTep4xtnCP17JZvbQfl3jWEIthqmrz0TOkY5UL"
		});
		request.form({
			 "sender_id": "FSTSMS",
		  "language": "english",
		  "route": "qt",
		  "numbers": docs.phone,
		  "message": "7883", 
		   "variables": "{#CC#}|{#BB#}",
		  "variables_values": docs.name+"|"+docs.password
		});
		request.end(function (res) {
		  if (res.error) throw new Error(res.error);

     	  console.log(res.body);
		});
		//email
		/*
		var transporter = nodemailer.createTransport({
		  service: 'gmail',
		  secure:false,
		  auth: {
			user: 'teambloggingarena@gmail.com',
			pass: 'psaxena#123456'
		  }
		});
		var mailOptions = {
		  from: 'teambloggingarena@gmail.com',
		  to: docs.email,
		  subject: 'Forgot Password',
		  text: "Hola,"+docs.name+" Your password is "+docs.password+" Make sure you don't share this with anyone."
		};
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
			console.log(error);
		  } else {
			console.log('Email sent: ' + info.response);
		  }
		});
      */
     
	});
});
app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('message1', 'You are not registered');
 // req.flash('message2', 'You entered wrong password.Go to forgot Password or try again');
  res.redirect("/user");
  
});
app.post("/user",passport.authenticate('local'),function(req,res){
	if(req.user.key=="student")
	res.redirect("/student");
    if(req.user.key=="teacher")  
    res.redirect("/teacher");
    if(req.user.key=="admin")  
    res.redirect("/admin");
	
   
});
app.get("/student",checkLogin,(req,res)=>{
	id=req.user.id
	student.findById(id,function(err,docs){
		res.render("index",{found:docs});
		
		});
});	
app.get("/profile",checkLogin,(req,res)=>{
	id=req.user.id //requesting id value from session
	student.findById(id,function(err,docs){		 //login id as key for info id values
	res.render("profile",{found:docs});

	});
});
app.get("/my-grades",checkLogin,(req,res)=>{
	id=req.user.id
	student.findById(id,function(err,docs){
		res.render("mygrades",{found:docs});
		
		});
});
app.get("/fill-exam-form",checkLogin,(req,res)=>{
	res.render("examform");
});
app.post("/results",checkLogin,(req,res)=>{
	var semester=req.body.sem;
	var exam=req.body.exam;
	id=req.user.id
	if(semester=="dummy"||exam=="dummy")
	res.redirect("/my-grades");
    student.findById(id,function(err,docs){	
    
	res.render("results",{found:docs,semValue:semester,examValue:exam});

	});
	
});
//faculty routings
app.get("/teacher",checkLogin,(req,res)=>{
	id=req.user.id
	teacher.findById(id,function(err,docs){
		res.render("teacher/teacher",{found:docs});
	});
	
});
app.get("/student-reports",(req,res)=>{
	res.render("teacher/student_reports");
	
});
app.post("/student-reports/results",(req,res)=>{
	Class=req.body.cls
	sub=req.body.cls
	filter=req.body.cls
	student.find({batch:Class},function(err,docs){
		res.render("teacher/student_reports_results",{found:docs});
	});
	
});

//admin routings
app.get("/admin",(req,res)=>{
	res.render("admin/admin");
});
app.get("/admin-students",(req,res)=>{
	res.render("admin/admin_students");
});
app.get("/admin-students/student-entries",(req,res)=>{
	res.render("admin/student_entries");
	
});
app.post("/admin-students",(req,res)=>{
	var Name=req.body.stu_name,
	 Class=req.body.stu_Class,
	 roll=req.body.stu_roll,
	 phone=req.body.stu_phone,
	 email=req.body.stu_email;
	console.log(Name+"  "+Class+"  "+roll+"  "+phone+"  "+email);
	student.create({"name":Name,"Class":Class,"rollno":roll,"phone":phone,"email":email},function(err,docs){
	if(!err) {res.render("admin/admin_student_success",{success:docs});}
	else { res.render("admin_student_fail");}
		
	});
});
function checkLogin(req,res,next){
		if(req.isAuthenticated())
		{
			return next();
		}
	     res.redirect("/");
	}
	
app.get("/signout",(req,res)=>{
	req.logout();
	res.redirect("/");
})
app.listen(3000,function(){
	console.log("App is running on port 3000");
});