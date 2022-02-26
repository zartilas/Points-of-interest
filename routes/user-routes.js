const express = require('express');
const { getAllUsers,getUserById,getUserByEmail,
        updateUserByEmail,
        addUser, 
        deleteUser} = 
        require('../controllers/userController');


const router = express.Router();


//gets
router.get('/users', getAllUsers);
router.get('/users/getUserById/:id', getUserById);
router.get('/users/getUserByEmail/:email', getUserByEmail);


//{posts,patches,deletes}
router.post('/users/addUser', addUser);
router.patch('/users/updateUserByEmail/:email', updateUserByEmail);
router.delete('/users/deleteUser/:id', deleteUser);


module.exports = {
    routes: router
}