const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

const createBookingSchema = Joi.object({
    userId: Joi.string().required(),
    dentistId: Joi.string().required().allow(""),
    date: Joi.date().required(),
    time: Joi.string().required(),
});

const updateBookingSchema = Joi.object({
    status: Joi.string().valid("Pending", "Confirmed", "Cancelled").required(),
});

module.exports = {
    createBookingSchema: validator(createBookingSchema),
    updateBookingSchema: validator(updateBookingSchema),
};