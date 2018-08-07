const AdminUser = require('../../models/Admin/adminUser');
const jwt = require('jsonwebtoken');
const formatter = require('../../helpers/responseFormatter');

module.exports.CREATE_ADMIN = function(req,res,next){
    AdminUser.findOne({'user_email' : req.body.user_email}).exec()
    .then((user) => {
        if(user){
            const resp = formatter.FormatResponse('false','Admin with given email address already exists.');
            return res.status(400).json(resp);
        }
       
            const newUSer = new AdminUser(req.body);           
            newUSer.save()
            .then((user) => {
                const resp = formatter.FormatResponse('true','Admin registered successfully.');
                return res.status(200).json(resp);
            })
            .catch((err) => {
                return next(err);
            });      
    })
    .catch((err) => {
        return next(err);
    });   
}

module.exports.CREATE_ADMIN = function(req,res,next){
    AdminUser.findOne({'user_email' : req.body.user_email}).exec()
    .then((user) => {
        if(user){
            const resp = formatter.FormatResponse('false','Admin with given email address already exists.');
            return res.status(400).json(resp);
        }
       
            const newUSer = new AdminUser(req.body);           
            newUSer.save()
            .then((user) => {
                const resp = formatter.FormatResponse('true','Admin registered successfully.');
                return res.status(200).json(resp);
            })
            .catch((err) => {
                return next(err);
            });      
    })
    .catch((err) => {
        return next(err);
    });   
}