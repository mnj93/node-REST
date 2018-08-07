const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const UserSchema = new Schema({
    user_fullname: {type:String,max:150},
    user_email: {type:String,required:true,lowercase:true},
    user_mobile : {type:String,min:10,max:15,required:true,unique:true},
    password : {type:String,min:6,required:true},
    user_active:{type:Boolean,default:true},
    registered_on : {type:Date,default:new Date()}
},
{
    timestamps : true
});

//Encrypt password before saving
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

//Compare method for comparing password during login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//Export module for use in other files
module.exports = mongoose.model('User',UserSchema);

