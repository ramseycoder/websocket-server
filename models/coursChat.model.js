const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursChatSchema = new Schema({
    subject: {
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    messages: [
        {
            user_name:String,
            message: String,
        }

    ]
});

module.exports = mongoose.model('coursChat',coursChatSchema);
