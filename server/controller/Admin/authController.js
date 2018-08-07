const AdminUser = require('../../models/Admin/adminUser');
const LoginHistory = require('../../models/Admin/adminLoginHistory');
const jwt = require('jsonwebtoken');
const formatter = require('../../helpers/responseFormatter');

module.exports.USER_LOGIN = (req,res,next) =>{    
      AdminUser.findOne({user_email : req.body.user_email}).exec()
      .then((user) => {
          if(user){
            user.comparePassword(req.body.password,(err,isMatch) => {
                if(err) return next(err);
                console.log(isMatch);
                if(isMatch){
                    const userToken =  jwt.sign({user_id:user._id,user_email:user.user_email},process.env.JWT_SECRET);
                    const history = new LoginHistory({
                        user_id :user._id,
                        user_email:user.user_email,
                        isLoggedIn : true
                    });
                    history.save().catch((err) => console.log('Unable to save login history.'))
                    const resp = formatter.FormatResponse('true','Login successfull.',{token:userToken});
                    res.status(200).json(resp);
                }
                else{
                    const resp = formatter.FormatResponse('false','Invalid Password',[]);
                    res.status(400).json(resp);
                }
            });
          }
          else{
              const response = formatter.FormatResponse('false','User not registered with given email.');
              return res.status(400).json(response);
          }
      })
      .catch((err) => {
        return next(err);
      });
}


module.exports.USER_LOGOUT = (req,res,next) =>{    
    LoginHistory.findOneAndUpdate({user_id : req.user_id,isLoggedIn : true},
     {$set : {isLoggedIn : false}},{new : true}).exec()
    .then((user) => {
        if(user){
            const response = formatter.FormatResponse('true','User logged out successfully.');
            return res.status(200).json(response);
          }
        else{
            const response = formatter.FormatResponse('false','Invalid Request.');
            return res.status(400).json(response);
        }
    })
    .catch((err) => {
      return next(err);
    });
}
