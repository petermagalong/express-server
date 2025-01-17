const express = require('express');
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController');
const { tryCatch } = require('../utils/tryCatch');

const router = express.Router();

router.post("/register", tryCatch(register));
router.post("/login", tryCatch(login));
router.post("/forgot-password", tryCatch(forgotPassword));
router.put("/reset-password/:username/:token", tryCatch(resetPassword));

module.exports = router;