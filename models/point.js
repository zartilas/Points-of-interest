const mongoose = require('mongoose');
const Joi = require('joi');

const pointSchema = new mongoose.Schema({
    pointname: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true  
    },
    address: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    }, 
    description: {
        type: String,
        minlength: 10,
        maxlength: 1000,
        required: true
    }
});

const Point = mongoose.model('Point', pointSchema);

const validatePoint = (point) => {
    const schema = Joi.object({
        pointname: Joi.string().min(5).max(50).required(),
        address: Joi.string().min(5).max(100).required(),
        description: Joi.string().min(10).max(1000).required()
    });
    return schema.validate(point);
}

module.exports.Point = Point;
module.exports.validate = validatePoint;