const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

const register = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    type: Joi.string().valid("ADMIN", "CUSTOMER", "DENTIST").required(),
    birthday: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string(),
    password: Joi.string().required(),
    mobileNumber: Joi.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    avatar: Joi.string(),
});

module.exports.AuthValidation = {
    register: validator(register),
};