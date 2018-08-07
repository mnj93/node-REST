const Jobs = require('../../models/jobs');
const jwt = require('jsonwebtoken');
const formatter = require('../../helpers/responseFormatter');
const jobApplication  = require('../../models/jobApplication');

module.exports.POST_NEW_JOB = (req,res,next) =>{
    Jobs.find({job_title : req.body.job_title,isActive : true}).exec()
    .then((jobs) => {
        if(jobs.length){
            const response  = formatter.FormatResponse('false','Job with same title already exists.');
            return res.status(400).json(response);
        }
        else{
            const newJob = new Jobs({
                job_title : req.body.job_title,
                job_description : req.body.job_description
            });
            newJob.save().then((job) => {
                const response = formatter.FormatResponse('true','Job posted successfully.',{Job : job});
                return res.status(200).json(response);
            }).catch((err) => {
                return next(err);
            });
        }
    })
    .catch((err) => {
        return next(err);
    })
}

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

module.exports.FETCH_JOB_APPLICATIONS = (req,res,next) =>{
     jobApplication.find({}).populate('applied_by','user_fullname user_email').populate('job_id','job_title job_description createdAt')
     .then((applications) => {
        const response = formatter.FormatResponse('true','Job applications fetched successfully',{job_applications : applications});
        return res.status(200).json(response);
     })
     .catch((err) => {
         return next(err);
     })
}