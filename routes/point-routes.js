const express = require('express');
const {getAllPoints, getAddPointView, addPoint} = 
        require('../controllers/pointController');


const router = express.Router();


//gets
router.get('/points', getAllPoints);
router.get('/points/addPoint', getAddPointView);
router.get('/points/getPointsById/:id', getPointsById);
router.get('/points/getPointsByName/:name', getPointsByName);


//posts
router.post('/points/addPoint', addPoint);
router.post('/points/updatePointsById/:id', updatePointsById);
router.post('/points/updatePointsByName/:id', updatePointsByName);
router.post('/points/deletePoints/:id', deletePoints);



module.exports = {
    routes: router
}