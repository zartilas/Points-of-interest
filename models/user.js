const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    lastname: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }, 
    phonenumber: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    email: {
        type: String,
        unique:true,
        minlength: 5,
        maxlength: 50,
        lowercase:true,
        
     
    }
});


const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
   
    const schema = Joi.object({
        firstname: Joi.string().min(5).max(50).required(),
        lastname: Joi.string().min(5).max(50).required(),
        phonenumber: Joi.string().min(10).max(10).required(),
        email: Joi.string().lowercase(true).min(5).max(50).email()
    });
    return schema.validate(user);

}

module.exports.User = User;
module.exports.validate = validateUser;