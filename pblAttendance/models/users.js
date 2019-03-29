var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    name: String,
    subject:String,
    create_date:{
        type:Date,
        default: Date.now
    },
    class:String
})

module.exports = mongoose.model('Users', usersSchema);