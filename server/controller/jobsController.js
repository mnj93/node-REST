const Jobs = require('../models/jobs');
const JobApplication = require('../models/jobApplication');
const jwt = require('jsonwebtoken');
const formatter = require('../helpers/responseFormatter');


module.exports.FETCH_JOBS = (req,res,next) =>{
    Jobs.find({isActive : true}).exec()
    .then((jobs) => {
        const response = formatter.FormatResponse('true','Jobs Fetched successfully',{Jobs : jobs});
        res.status(200).json(response);
    })
    .catch((err) => {
        return next(err);
    })
}

module.exports.APPLY_FOR_JOB = (req,res,next) =>{   
    Jobs.findOne({_id:req.params.id,isActive : true}).exec()
    .then((job) => {
        if(!job){
            const response = formatter.FormatResponse('false','Invalid request, Job does not exists.');
            return res.status(400).json(response);
        }
       else{
           
            JobApplication.find({applied_by:req.user_id,job_id : req.params.id,isActive:true })
            .then((application) => {
                if(application.length){
                    const response = formatter.FormatResponse('false','You have already applied for this job.');
                    return res.status(400).json(response);
                }
                else{
                    console.log('abcvav');
                    const newApplication = new JobApplication({
                        applied_by:req.user_id,
                        job_id :  req.params.id
                    });
                    newApplication.save().then((app) => {
                        const response = formatter.FormatResponse('true','Applied for job successfully.',{job_application : app});
                        return res.status(200).json(response);
                    })
                    .catch((err) => {
                        return next(err);
                    })
                }
            })
            .catch((err) => {
                return next(err);
            })           
       }
    })
    .catch((err) => {
        return next(err);
    })
}