const AppError = require("../utils/appError");

/* eslint-disable no-unused-vars */
const errorHandler = (error, req, res, next) => {
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