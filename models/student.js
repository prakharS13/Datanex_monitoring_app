var mongoose=require("mongoose");
var mySchema =new mongoose.Schema({
	name: String,
	email:String,
	Class:String,
	branch:String,
	rgpv:[{sem:Number,score:Number}],
	phone:Number,
	marks:[{sem1:[{activity1:[{sub:String,score:Number}]},{activity2:[{sub:String,score:Number}]},{midterm1:[{sub:String,score:Number}]},{midterm2:[{sub:String,score:Number}]}]},
	       {sem2:[{activity1:[{sub:String,score:Number}]},{activity2:[{sub:String,score:Number}]},{midterm1:[{sub:String,score:Number}]},{midterm2:[{sub:String,score:Number}]}]}
		  ]
});
module.exports=mongoose.model("info",mySchema);