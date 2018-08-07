const validator = require('validator');
const formatter = require('../../helpers/responseFormatter')

module.exports.validateLogin  = (req,res,next) => {
    if(Object.keys(req.body).length === 0){        
    //    return res.status(400).   
        const json = formatter.FormatResponse('false','Invalid request',[]);
        return res.status(400).json(json);
    }       
    else if(!(req.body.user_email)){
        const json = formatter.FormatResponse('false','Invalid request.',[]);
        return res.status(400).json(json);
    }
    else if(!validator.isEmail(req.body.user_email)){
        const json = formatter.FormatResponse('false','Invalid user email.',[]);
        return res.status(400).json(json);
    }   
    else if(!(req.body.password)){
        const json = formatter.FormatResponse('false','Invalid request.');
        return res.status(400).json(json);
    }
    else if(req.body.password.length < 6){
        const json = formatter.FormatResponse('false','Invalid Password.');
        return res.status(400).json(json);
    }    
    next();
}

