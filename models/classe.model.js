const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
     name:{
         type:String
     },
     forums:[{
         type:Schema.Types.ObjectId,
         ref:"forum",
     }],
    chats: [{
         type:Schema.Types.ObjectId,
        ref:"coursChat"
    }]
});

module.exports = mongoose.model('classe',ClassSchema);
