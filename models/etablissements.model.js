const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EtsSchema = new Schema({
    name:{
        type:String
    },
    classes:[{
        type:Schema.Types.ObjectId,
        ref:'classe'
    }]
});

module.exports = mongoose.model('etablissement',EtsSchema);
