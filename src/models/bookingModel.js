const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    dentistId:{
        type: String,
    },
    bookingDate:{
        type: Date,
    },
    status:{
        type: String,
        enum: [ "APPROVE", "DISAPPROVED", "PENDING" ],
        default: "PENDING",
    }
});

module.exports = mongoose.model("Booking", bookingSchema);

