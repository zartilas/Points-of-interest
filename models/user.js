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
        minlength: 11,
        required: true
    },
    cnic: {
        type: String,
        required: true
    }
    // }, 
    // email: {
    //    type: mongoose.SchemaTypes.Email, 
    //    lowercase: true,
    //    minlength: 5,
    //    maxlength: 50,
    //    required: true
    // }
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = {
        firstname: Joi.string().min(5).max(50).required(),
        lastname: Joi.string().min(5).max(50).required(),
        phonenumber: Joi.string().min(11).required(),
        cnic: Joi.string().required()
        //email: Joi.email().min(5).max(50).required()
    }

    return Joi.validate(user, schema);
}


module.exports.User = User;
module.exports.validate = validateUser;