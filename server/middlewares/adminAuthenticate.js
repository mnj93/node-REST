var jwt = require('jsonwebtoken');
const LoginHistory = require('../models/Admin/adminLoginHistory');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = function(req,res,next){
    const header = req.headers.authorization;
    let token;
    if(header) token = header.split(' ')[1];

    if(token){
        jwt.verify(token,JWT_SECRET,(err,decoded) => {
            if(err){
                res.status(401).json({success:"false",msg:"Invalid Token!"});
            }
            else{
                LoginHistory.findOne({user_id:decoded.user_id,isLoggedIn : true},{},{sort : {'createdAt' : -1}}).exec()
                .then(user => {                   
                    if(user){
                        req.user_id = decoded.user_id;
                        next();
                    }
                    else{
                        res.status(401).json({success:"false",msg:"You are not authorized."});
                    }
                })
                .catch(err => {
                    next(err);
                });
                // User.findOne({_id:decoded.user_id}).exec()
                // .then(user => {
                //     if(user){
                //         req.user_id = decoded.user_id;
                //         next();
                //     }
                //     else{
                //         res.status(400).json({success:"false",msg:"Invalid User!"});
                //     }
                // })
                // .catch(err => {
                //     next(err);
                // });
            }
        });
    }
    else{
        res.status(401).json({success:"false",msg:"You are not authorized"});
    }
}


module.exports = authenticate;