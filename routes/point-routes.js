const express = require('express');
const { getAllPoints,getPointById,getPointByName,
        updatePointById,updatePointByName, 
        addPoint, 
        deletePoint} = 
        require('../controllers/pointController');


const router = express.Router();


//gets
router.get('/points', getAllPoints);
router.get('/points/getPointById/:id', getPointById);
router.get('/points/getPointByName/:name', getPointByName);


//{posts,patches,deletes}
router.post('/points/addPoint', addPoint);
router.patch('/points/updatePoinById/:id', updatePointById);
router.patch('/points/updatePointByName/:name', updatePointByName);
router.delete('/points/deletePoint/:id', deletePoint);



module.exports = {
    routes: router
}