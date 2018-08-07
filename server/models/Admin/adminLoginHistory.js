const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginHistorySchema = new Schema({
    user_id: {type:Schema.Types.ObjectId,required:true,ref:'Admin'},
    user_email: {type:String,required:true,index:true},
    isLoggedIn: {type:Boolean,required:true}
},
{
    timestamps : true
});

module.exports = mongoose.model('AdminLoginHistory',LoginHistorySchema);