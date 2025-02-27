const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    dayOfWeek: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
});
const unavailabilitySchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
});
const dentistSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        uniuqe: true,
    },
    availability: {
        type: [availabilitySchema],
        default: [],
    },
    unavailability:{
        type: [unavailabilitySchema],
        default: [],
    },

});

module.exports = mongoose.model("Dentist", dentistSchema);

