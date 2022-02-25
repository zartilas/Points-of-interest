const express = require('express');
const {getAllPoints, getAddPointView, addPoint,
        getUpdatePointView, updatePoint, getDeletePointView, deletePoint} = 
        require('../controllers/pointController');


const router = express.Router();

router.get('/points', getAllPoints);
router.get('/addPoint', getAddPointView);
router.post('/addPoint', addPoint);
router.get('/updatePoint/:id', getUpdatePointView);
router.post('/updatePoint/:id', updatePoint);
router.get('/deletePoint/:id', getDeletePointView);
router.post('/deletePoint/:id', deletePoint);



module.exports = {
    routes: router
}