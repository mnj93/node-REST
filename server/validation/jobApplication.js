const validator = require('validator');
const formatter = require('../helpers/responseFormatter')

module.exports.validateJobApplication  = (req,res,next) => {
    if(!(req.params.id)){
        const json = formatter.FormatResponse('false','Invalid request.',[]);
        return res.status(400).json(json);
    }   
    else if(!(req.params.id).match(/^[a-f\d]{24}$/i))  {
        const json = formatter.FormatResponse('false','Invalid parameter value.',[]);
        return res.status(400).json(json);
    }   
    next();
}