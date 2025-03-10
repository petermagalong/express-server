const jwt = require("jsonwebtoken");

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

        try {     
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decode._doc;

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `No token provided ${error.message}`
            });
        }
    }else {
        return res.status(500).json({
            message: "No token provided"
        });
    }
    
    

};

module.exports = verifyToken;