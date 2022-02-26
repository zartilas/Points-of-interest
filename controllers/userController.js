const {User,validate} = require('../models/user');
//const dupEmail = require("../middleware/checkEmail"); //never used

const getAllUsers = async (req, res, next) => {
    const userList = await User.find().exec();
    return res.status(200).json({
        status: "success",
        results: userList.length,
        data: {
            userList
        }
    })
    
}

const addUser = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);

    try{
        const data = req.body;
        let user = await new User({
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
            email: data.email
        });
        user = await user.save();
        return res.status(200).json({
            status:"success",
            message: "User added!",
            data: {
                user
            }
        }); 
    } catch (error) {
      
        res.status(200).json({
            status:"failure",
            message: "Email is already in use!"
        
        })
    }
}

const getUserById = async (req, res, next)=>{

   try{
        const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            status:"failure",
            message: "Something went wrong, Try again. Maybe not found",
        });
    }

    return res.status(200).json({
        status:"success",
        data: {
            user
        }
    });
   }catch{
    res.status(404).json({
        status:"failure",
        message: "Something went wrong, Try again.",
    });
   }
   
}


const getUserByEmail = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.params.email});
        if (!user) {
            return res.status(404).json({
                status:"failure",
                message: "Something went wrong, Try again. Maybe not found",
            });
        }
        return res.status(200).json({
            status:"success",
            data: {
                user_name: user.firstname + " " + user.lastname
            }
        });
    }catch{
    res.status(404).json({
        status:"failure",
        message: "Something went wrong, Try again.",
    });
   }
}

const updateUserByEmail = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let user = await User.findOneAndUpdate(req.params.email, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email: req.body.email
    }, {new: true});
    if(!user) return res.status(400).json({
        status:"failure",
        message: "Something went wrong, Try again. Maybe not found",
    }); else  
    return res.status(200).json({
        status:"success",
        message: "User was updated successfully!",
        data: req.body
        
    });
}



const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if(!user) return res.status(400).json({
            status:"failure",
            message: "Something went wrong, Try again. Maybe not found"});
        else
        return res.status(200).json({
            status:"success",
            message: "User deleted!",
            data:{
                user: "GoodBye " + user.firstname + " " + user.lastname
            }
        });   
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    //gets
    getAllUsers,
    getUserById,
    getUserByEmail,

    //post
    addUser,

    //patch
    updateUserByEmail,
   
    //delete
    deleteUser
}