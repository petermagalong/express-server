const AppError = require("../utils/appError");

const errorHandler = (error, res) => {

    if(error.name === "ValidationError"){
        return  res.status(400).json({
            status: "validationError",
            message: error.message
        });
    }

    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "AppError",
            message: error.message
        });
    }
    
    return res.status(400).json({
        status: "error",
        message: error.message || error
    });
};

module.exports = errorHandler;