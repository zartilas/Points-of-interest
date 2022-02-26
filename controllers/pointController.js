const {Point,validate} = require('../models/point');

const getAllPoints = async (req, res, next) => {
    const listOfPoints = await Point.find().exec();
    return res.status(200).json({
        status: "success",
        results: listOfPoints.length,
        data: {
            listOfPoints
        }
        
    })
    
}


const getPointById = async (req, res, next)=>{
    const id = req.params.id;
    const point = await Point.findById(id);
    if (!point) {   
        return res.status(404).json({
            status:"failure",
            message: "Something went wrong, Try again. Maybe not found",
        });
    }
    return res.status(200).json({
        status:"success",
        data: {
            point
        }
    });
}

const getPointByName = async (req, res, next) => {
    const name = req.params.name;
    const point = await Point.findOne({name: name});
    // if (!point) {
    //     return res.status(404).json({
    //         status:"failure",
    //         message: "Something went wrong, Try again. Maybe not found",
    //     });
    // }

    return res.status(200).json({
        status:"success",
        data: {
            point
        }
    });
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
    
    return res.status(200).json({
        status:"success",
        message: "Point added!",
        data: {
            point
        }
    });

}

const updatePointByName = async(req, res, next) => {
    //const {error} = validate(req.body);
    //if (error) return res.status(422).send(error.details[0].message);
    const old_Name = req.params.name;
    const data = req.body;
    let point = await Point.updateOne({name: old_Name}, {
        pointname: data.pointname,
        address: data.address,
        description: data.description
    }, {new: true});
    if(!point) return res.status(400).json({
        status:"failure",
        message: "Something went wrong, Try again. Maybe not found",
    }); else
    return res.status(200).json({
        status:"success",
        message: "Point was updated successfully!",
        data: {
            old_Name,
            new_Name:data
        }
    });
}

const updatePointById = async(req, res, next) => {
    // const {error} = validate(req.body);
    // if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const olddata = await Point.findById(id);
    const data = req.body;

    let point = await Point.findByIdAndUpdate(id, {
        pointname: data.pointname,
        address: data.address,
        description: data.description
    }, {new: true});
    if(!point) return res.status(400).json({
        status:"failure",
        message: "Something went wrong, Try again. Maybe not found",
    }); else
    return res.status(200).json({
        status:"success",
        message: "Point was updated successfully! (by ID)",
        data: {
            old_Point: olddata,  
            new_Point: point
        }
    });
}

const deletePoint = async (req, res, next) => {
    try {
        const id = req.params.id;
        const point = await Point.findByIdAndRemove(id);
        if(!point) return res.status(400).json({
            status:"failure",
            message: "Something went wrong, Try again. Maybe not found"});
        else
        return res.status(200).json({
            status:"success",
            message: "Point deleted successfully!"
        });   
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {

    //get
    getAllPoints,
    getPointById,
    getPointByName,
 
    //post
    addPoint,

    //patch
    updatePointByName,
    updatePointById,
 
    
    //delete
    deletePoint
}