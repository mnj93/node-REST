const LoginHistory = require('../models/loginHistory');
const formatter = require('../helpers/responseFormatter');
module.exports.LoginCheck = (req,res,next) => {
    LoginHistory.findOne({user_email : req.body.user_email,isLoggedIn:true}).exec()
    .then((result) => {
        if(result){
            const response = formatter.FormatResponse('false','You\'re already logged in from another device.');
            return res.status(400).json(response);
        }
        next();
    })
    .catch((err) => {
        return next(err);
    });
    
}