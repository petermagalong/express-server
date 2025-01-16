const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async ( req, res) => {
    try {
        const {username, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again',
        })
    }
    
}

const login = async ( req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            })
        }

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again',
        })
    }
    
}

const forgotPassword = async (req, res) => {
    try {
        const {username} = req.body;
        const user = await User.findOne({username});

        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            })
        }

        const secret = process.env.JWT_SECRET+user.password;

        const token = jwt.sign({id: user._id, role: user.role}, secret, {expiresIn: '1h'});

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again',
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const {token, username} = req.params;
        const {password} = req.body;
        console.log(username)
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid token or user not found'
            })
        }

        const data = jwt.verify(token, process.env.JWT_SECRET+user.password);
        
        console.log(data)
        if(!data.id || data.id !== user.id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token or user not found'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password reset successful',
            data
        })
        
    } catch (error) {
        
    }
}

module.exports = {
    resetPassword,
    forgotPassword,
    register,
    login
}