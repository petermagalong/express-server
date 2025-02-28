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
    firstName:{
        type: String,
        required: true,
    },
    address:{
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
        enum: ["admin", "user", "dentist"],
        default: "user"
    },
    avatar:{
        type: String,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);