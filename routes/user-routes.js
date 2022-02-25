const express = require('express');
const {getAllUsers, addUser, deleteUser} = 
        require('../controllers/userController');


const router = express.Router();


//gets
router.get('/users', getAllUsers);
router.get('/users/getUserById/:id', getUserById);
router.get('/users/getUserByEmail/:email', getUserByEmail);
router.get('/users/getUserNameByEmail/:email', getUserNameByEmail);

//posts
router.post('/users/addUser', addUser);
router.post('/users/updateUserByEmail/:email', updateUserByEmail);
router.post('/users/updateUserById/:id', updateUserById);
router.post('/users/deleteUser/:id', deleteUser);


module.exports = {
    routes: router
}