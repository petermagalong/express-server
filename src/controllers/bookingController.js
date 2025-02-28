const Booking = require("../models/bookingModel");
const AppError = require("../utils/appError");
const { sendSMS } = require("../utils/sms");

const createBooking = async (req, res) => {
    const { userId, dentistId, date, time } = req.body;
    
    const dateCount = await Booking.find({ dentistId, bookingDate:date }).countDocuments();
    if(dateCount > 10)
    {
        throw new AppError(false, "Dentist is fully booked for the day", 400);
    }

    const userBooking = await Booking.findOne({ userId }).where("bookingDate").equals(date);
    if(userBooking) throw new AppError(false, "User already booked", 400);

    const newBooking = new Booking({
        userId,
        dentistId,
        bookingDate: date,
        time,
    });

    const result = await newBooking.save();

    if(result) await sendSMS(`You have a pending booking on ${date} at ${time}`);
    
    return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        result,
    });
};

const getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find().populate("userId", "-password").populate("dentistId");

        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            result: bookings,
        });
    } catch (error) {
        return next(error);
    }
};

const updateBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });

        if (!updatedBooking) {
            throw new AppError(false, "Booking not found", 404);
        }

        return res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            result: updatedBooking,
        });
    } catch (error) {
        return next(error);
    }
};

const deleteBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            throw new AppError(false, "Booking not found", 404);
        }

        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
            result: deletedBooking,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createBooking,
    getBookings,
    updateBooking,
    deleteBooking,
};