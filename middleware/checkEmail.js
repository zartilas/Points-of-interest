const User = require("../models/user");

//never used, We check email from User model with the mongoose (unique:true)

duplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (user) {
        return res.status(200).json({ 
            message: "Email is already in use!" 
        });
      }
      next();
    });
};

const emailCheck = {
    duplicateEmail
};

module.exports = emailCheck;