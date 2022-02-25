const {User,validate} = require('../models/user');

const getAllUsers = async (req, res, next) => {
    const list = await User.find().exec();
    res.render('user/userlist', {
        users: list
    });
}

const getAddUserView = (req, res, next) => {
    res.render('user/addUser');
}

const addUser = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let user = await new User({
        firstname: data.firstname,
        lastname: data.lastname,
        phonenumber: data.phonenumber,
        email: data.email
    });
    user = await user.save();
    res.redirect('users');
}

const getUpdateUserView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneuser = await User.findById(id).exec();
        res.render('user/updateUser', {
            user: oneuser
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let user = await User.findByIdAndUpdate(id, {
        firstname: data.firstname,
        lastname: data.lastname,
        phonenumber: data.phonenumber,
        email: data.email
    }, {new: true});
    if(!user) return res.status(404).send('User with the given id not found');

    res.redirect('/');
}

const getDeleteUserView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneuser = await User.findById(id).exec();
        res.render('user/deleteUser', {
            user: oneuser
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndRemove(id);
        if(!user) return res.status(404).send('User with the given id not found');
        res.redirect('/');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllUsers,
    getAddUserView,
    addUser,
    getUpdateUserView,
    updateUser,
    getDeleteUserView,
    deleteUser
}