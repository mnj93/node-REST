const validator = require('validator');
const formatter = require('../helpers/responseFormatter')

module.exports.ValidatePostUser  = (req,res,next) => {
    if(Object.keys(req.body).length === 0){        
    //    return res.status(400).   
        const json = formatter.FormatResponse('false','Invalid request',[]);
        return res.status(400).json(json);
    }
    else if(!(req.body.user_fullname)){
        
        const json = formatter.FormatResponse('false','Invalid request.',[]);
        return res.status(400).json(json);
    }
    else if(!/^[a-zA-Z ]*$/.test(req.body.user_fullname)){
        console.log('abchba');
        const json = formatter.FormatResponse('false','Invalid Full Name, Only alphabets allowed.',[]);
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
    else if(!(req.body.user_mobile)){
        const json = formatter.FormatResponse('false','Invalid request.',[]);
        return res.status(400).json(json);
    }
    else if(!validator.isNumeric(req.body.user_mobile) || req.body.user_mobile.length != 10){
        const json = formatter.FormatResponse('false','Invalid user mobile.',[]);
        return res.status(400).json(json);
    }
    else if(!(req.body.password)){
        const json = formatter.FormatResponse('false','Invalid request.');
        return res.status(400).json(json);
    }
    else if(req.body.password.length < 6){
        const json = formatter.FormatResponse('false','Minimum length for password is 6 chars.');
        return res.status(400).json(json);
    }    
    next();
}