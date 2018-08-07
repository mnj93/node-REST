const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    job_title: {type:String,required:true,index:true},
    job_description: {type:String,required:true},
    posted_by : {type : Schema.Types.ObjectId,ref:'Admin'},
    isActive: {type:Boolean,required:true,default:true}
},
{
    timestamps : true
});

module.exports = mongoose.model('Job',JobSchema);