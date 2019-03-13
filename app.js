var bodyParser= require("body-parser"),
express =require("express"),
mongoose =require("mongoose"),
student=require("./models/student");

var app=express();
//Database conn
mongoose.connect("mongodb://codehank:abc123456@ds111771.mlab.com:11771/student_monitoring",{useNewUrlParser:true},function(err){
	if(err) throw err;
	console.log("Successfully connected");
	});

//App Config
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public")); 



//student routings
app.get("/",(req,res)=>{
	res.render("index");
});
app.get("/profile",(req,res)=>{
	student.findOne({},function(err,docs){		
	res.render("profile",{found:docs});

	});
});
app.get("/my-grades",(req,res)=>{
	res.render("mygrades");
});
app.get("/fill-exam-form",(req,res)=>{
	res.render("examform");
});
app.post("/results",(req,res)=>{
	var semester=req.body.sem;
	var exam=req.body.exam;
	if(semester=="dummy"||exam=="dummy")
	res.redirect("/my-grades");
    student.find({},function(err,docs){		
	res.render("results",{found:docs,semValue:semester,examValue:exam});

	});
	
});
//faculty routings
app.get("/teacher",(req,res)=>{
	res.render("teacher");
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
app.listen(3000,function(){
	console.log("App is running on port 3000");
});