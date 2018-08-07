const Jobs = require('../models/jobs');
const jwt = require('jsonwebtoken');
const formatter = require('../helpers/responseFormatter');

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
        }
    })
    .catch((err) => {
        return next(err);
    })
}