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

  try{
        const point = await Point.findById(req.params.id);
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

    }catch{
        res.status(404).json({
            status:"failure",
            message: "Something went wrong, Try again.",
        });
    }
}


const getPointByName = async (req, res, next) => {
    try{
        const point = await Point.findOne({pointname: req.params.pointname});
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
    }catch{
        res.status(404).json({
            status:"failure",
            message: "Something went wrong, Try again.",
        });
       }   
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
 
    const data = req.body;
    let point = await Point.findOneAndUpdate({name: req.params.name}, {
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
           data
        }
    });
}

const updatePointById = async(req, res, next) => {
    // const {error} = validate(req.body);
    // if (error) return res.status(422).send(error.details[0].message);
    const olddata = await Point.findById(req.params.id);
    const data = req.body;

    let point = await Point.findByIdAndUpdate(req.params.id, {
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
            message: "Point deleted!",
            data:{
                point: "GoodBye " + point.pointname
            }
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

    //patches
    updatePointByName,
    updatePointById,
 
    
    //delete
    deletePoint
}