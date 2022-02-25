const {Point,validate} = require('../models/point');

const getAllPoints = async (req, res, next) => {
    const list = await Point.find().exec();
    res.render('point/pointlist', {
        points: list
    });
}

const getAddPointView = (req, res, next) => {
    res.render('point/addPoint');
}

const addPoint = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let point = await new Point({
        pointname: data.pointname,
        address: data.address,
        description: data.description
    });
    point = await point.save();
    res.redirect('/');
}

const getUpdatePointView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onepoint = await Point.findById(id).exec();
        res.render('point/updatePoint', {
            point: onepoint
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePoint = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let point = await Point.findByIdAndUpdate(id, {
        pointname: data.pointname,
        address: data.address,
        description: data.description
    }, {new: true});
    if(!point) return res.status(404).send('Point with the given id not found');

    res.redirect('/');
}

const getDeletePointView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onepoint = await Point.findById(id).exec();
        res.render('point/deletePoint', {
            point: onepoint
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePoint = async (req, res, next) => {
    try {
        const id = req.params.id;
        const point = await Point.findByIdAndRemove(id);
        if(!point) return res.status(404).send('Point with the given id not found');
        res.redirect('/');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllPoints,
    getAddPointView,
    addPoint,
    getUpdatePointView,
    updatePoint,
    getDeletePointView,
    deletePoint
}