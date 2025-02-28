const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

const registerValidate = Joi.object().keys({
    firstName: Joi.string().required(),
    middleName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    type: Joi.string().valid("admin", "user", "dentist").required(),
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
    id: Joi.string(),
});

const updateUserValidate = Joi.object().keys({
    firstName: Joi.string(),
    middleName: Joi.string(),
    lastName: Joi.string(),
    gender: Joi.string().valid("Male", "Female"),
    type: Joi.string().valid("admin", "user", "dentist"),
    birthday: Joi.string(),
    address: Joi.string(),
    email: Joi.string().email(),
    // username: Joi.string(),
    password: Joi.string(),
    mobileNumber: Joi.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    avatar: Joi.string(),
});

const loginValidate = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports.AuthValidation = {
    updateUserValidate: validator(updateUserValidate),
    registerValidate: validator(registerValidate),
    loginValidate: validator(loginValidate),
};