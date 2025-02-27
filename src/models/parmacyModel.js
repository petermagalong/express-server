const mongoose = require('mongoose');

const parmacySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    availability:{
        type: Date,
    },

})

module.exports = mongoose.model("Parmacy", parmacySchema);

