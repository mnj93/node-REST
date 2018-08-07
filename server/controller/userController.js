const User = require('../models/user');
const jwt = require('jsonwebtoken');
const formatter = require('../helpers/responseFormatter');

exports.CREATE_USER = function(req,res,next){

    User.findOne({'user_email' : req.body.user_email}).exec()
    .then((user) => {
        if(user){
            const resp = formatter.FormatResponse('false','User with given email address already exists.');
            return res.status(400).json(resp);
        }
        User.findOne({'user_mobile':req.body.user_mobile}).exec()
        .then((user) => {
            if(user){
                const resp = formatter.FormatResponse('false','User with given mobile number already exists.');
                return res.status(400).json(resp);
            }
            const newUSer = new User(req.body);           
            newUSer.save()
            .then((user) => {
                const resp = formatter.FormatResponse('true','User registered successfully.');
                return res.status(200).json(resp);
            })
            .catch((err) => {
                return next(err);
            });
        })
        .catch((err) => {
            return next(err);
        });
    })
    .catch((err) => {
        return next(err);
    });   
}