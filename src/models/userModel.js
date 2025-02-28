const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "manager", "user"]
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    middleName:{
        type: String,  
    },
    birthday:{
        type: Date,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required:true,
    },
    mobileNumber:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["USER", "DOCTOR", "ADMIN"],
        default: "USER"
    },
    avatar:{
        type: String,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);