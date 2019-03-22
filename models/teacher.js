var mongoose=require('mongoose');
var teacherSchema=new mongoose.Schema({
   id:Object,
   name:String,
   department:String,
   phone:Number,
   email:String,
   emp_id:String,
   mentor:String,
   subject:String,
   joined:String,
   clsAllocated:[{batch:String,id:Number}]
});
module.exports=mongoose.model("teacher",teacherSchema);