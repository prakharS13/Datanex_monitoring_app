var mongoose=require("mongoose");
var mySchema =new mongoose.Schema({
	name: String,
	email:String,
	Class:String,
        rollno:String,
        password:String,
	branch:String,
	rgpv:[{sem:Number,score:Number}],
	phone:Number,
	batch:String,
	ActivitySem1:[{sub:String,score:Number}],
        MidtermSem1:[{sub:String,score:Number}],
        ActivitySem2:[{sub:String,score:Number}],
        MidtermSem2:[{sub:String,score:Number}],
        ActivitySem3:[{sub:String,score:Number}],
        MidtermSem3:[{sub:String,score:Number}],
        ActivitySem4:[{sub:String,score:Number}],
        MidtermSem4:[{sub:String,score:Number}],
        ActivitySem5:[{sub:String,score:Number}],
        MidtermSem5:[{sub:String,score:Number}]
		  
});
module.exports=mongoose.model("info",mySchema);


