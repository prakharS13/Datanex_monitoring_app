var mongoose = require('mongoose');

var attendanceSchema = mongoose.Schema({
    name: String,
    subject:String,
    create_date:{
        type:String,
        default: Date.now
        
    },
    attend:String
})

module.exports = mongoose.model('Attendance', attendanceSchema);