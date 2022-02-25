const express = require('express');
const {getAllUsers, getAddUserView, addUser,
        getUpdateUserView, updateUser, getDeleteUserView, deleteUser} = 
        require('../controllers/userController');


const router = express.Router();

router.get('/users', getAllUsers);
router.get('/addUser', getAddUserView);
router.post('/addUser', addUser);
router.get('/updateUser/:id', getUpdateUserView);
router.post('/updateUser/:id', updateUser);
router.get('/deleteUser/:id', getDeleteUserView);
router.post('/deleteUser/:id', deleteUser);



module.exports = {
    routes: router
}