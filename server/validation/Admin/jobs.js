const validator = require('validator');
const formatter = require('../../helpers/responseFormatter')

module.exports.ValidatePostJob  = (req,res,next) => {
    if(Object.keys(req.body).length === 0){        
    //    return res.status(400).   
        const json = formatter.FormatResponse('false','Invalid request',[]);
        return res.status(400).json(json);
    }
    else if(!(req.body.job_title)){
        
        const json = formatter.FormatResponse('false','Invalid request.',[]);
        return res.status(400).json(json);
    }    
    else if(!(req.body.job_description)){
        const json = formatter.FormatResponse('false','Invalid request.',[]);
        return res.status(400).json(json);
    }    
    next();
}