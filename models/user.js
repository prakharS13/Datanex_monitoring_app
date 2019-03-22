var mongoose=require("mongoose"),
passportLocalMongoose=require("passport-local-mongoose");
var loginSchema =new mongoose.Schema({
	_id:Object,
        username:String,
        password:String,
        key:String
});

loginSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("authen",loginSchema);
