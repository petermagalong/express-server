const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const register = async ( req, res) => {

    const {username, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword,
        role
    });
    const result = await newUser.save();

    if(!result) {
        throw new AppError(false, "User not created", 400);
    }

    res.status(201).json({
        success: true,
        message: "User created successfully",
    });
    
};

const login = async ( req, res) => {

    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(!user) {
        throw new AppError(false, "Invalid username or password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new AppError(false, "Invalid username or password", 401);
    }

        const secret = process.env.JWT_SECRET;
        
        const token = jwt.sign({...user}, secret, {expiresIn: '1h'});

        if(token){
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token
            })
        } else {
            throw new AppError(false, "Invalid username or password", 401);
        }
        

};

const forgotPassword = async (req, res) => {

    const {username} = req.body;
    const user = await User.findOne({username});

    if(!user) {
        throw new AppError(false, "Invalid username or password", 401);
    }

    const secret = process.env.JWT_SECRET+user.password;

    const token = jwt.sign({id: user._id, role: user.role}, secret, {expiresIn: "1h"});

    if(token){
        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    } else {
        throw new AppError(false, "Invalid username or password", 401);
    }
};

const resetPassword = async (req, res) => {

    const {token, username} = req.params;
    const {password} = req.body;

    const user = await User.findOne({username});
    if(!user){
        throw new AppError(false, "Invalid token or user not found", 401);
    }

    const data = jwt.verify(token, process.env.JWT_SECRET+user.password);
        
    if(!data.id || data.id !== user.id) {
        throw new AppError(false, "Invalid token or user not found", 401);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    const result = await user.save();

    if(!result) {
        throw new AppError(false, "Password reset failed", 400);
    }

    return res.status(200).json({
        success: true,
        message: "Password reset successful",
        data
    });

}
const getUserInfo = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'User information',
        data: req.user
    })
}

module.exports = {
    resetPassword,
    forgotPassword,
    register,
    getUserInfo,
    login
};