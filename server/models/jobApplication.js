const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobApplicationSchema = new Schema({
    applied_by: {type : Schema.Types.ObjectId,ref:'User'},
    job_id:  {type : Schema.Types.ObjectId,ref:'Job'},   
    isActive: {type:Boolean,required:true,default:true},
    isContacted : {type:Boolean,default:false}    
},
{
    timestamps : true
});

module.exports = mongoose.model('JobApplication',JobApplicationSchema);