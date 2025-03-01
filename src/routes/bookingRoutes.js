const express = require("express");
const { tryCatch } = require("../utils/tryCatch");
const { createBooking, getBookings, updateBooking, deleteBooking } = require("../controllers/bookingController");
const { createBookingSchema, updateBookingSchema } = require("../validations/createBooking");
const router = express.Router();

router.post("/", tryCatch(createBooking,createBookingSchema));
router.get("/", tryCatch(getBookings));
router.put("/:bookingId", tryCatch(updateBooking,updateBookingSchema));
router.delete("/:bookingId", tryCatch(deleteBooking));

module.exports = router;