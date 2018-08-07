const Jobs = require('../models/jobs');
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