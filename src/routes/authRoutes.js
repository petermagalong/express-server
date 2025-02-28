const express = require("express");
const { register, login, forgotPassword, resetPassword } = require("../controllers/authController");
const { tryCatch } = require("../utils/tryCatch");
const { AuthValidation } = require("../validations/authValidation");

const router = express.Router();

router.post("/register", tryCatch(register,AuthValidation.registerValidate));

router.post("/login", tryCatch(login, AuthValidation.loginValidate));
router.post("/forgot-password", tryCatch(forgotPassword));
router.put("/reset-password/:username/:token", tryCatch(resetPassword));

module.exports = router;