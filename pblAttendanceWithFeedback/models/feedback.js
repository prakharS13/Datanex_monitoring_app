var mongoose = require('mongoose');

var feedbackSchema = mongoose.Schema({
    name: String,
    feed:String,
    create_date:{
        type:String,
        default: Date.now
        
    },
    describe:String
})

module.exports = mongoose.model('Feedback', feedbackSchema);