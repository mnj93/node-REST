var jwt = require('jsonwebtoken');
var config = require('../utils/config');
var User = require('../models/users');
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
                User.findOne({_id:decoded.user_id}).exec()
                .then(user => {
                    if(user){
                        req.user_id = decoded.user_id;
                        next();
                    }
                    else{
                        res.status(400).json({success:"false",msg:"Invalid User!"});
                    }
                })
                .catch(err => {
                    next(err);
                });
            }
        });
    }
    else{
        res.status(401).json({success:"false",msg:"You are not authorized"});
    }
}


module.exports = authenticate;