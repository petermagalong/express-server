const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  
    let token;

    let authHeader = req.headers.authorization || req.headers.Authorization;
    
    if(authHeader?.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
  
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next();

    }else {
        throw new AppError(false, "No token provided", 500);
    }
    
    

};

module.exports = verifyToken;