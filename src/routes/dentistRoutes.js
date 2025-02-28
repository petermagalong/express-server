const express = require("express");
const { getAllDentist, addDentist } = require("../controllers/dentistController");
const { tryCatch } = require("../utils/tryCatch");
const router = express.Router();
const authorizeRoles = require("../middlewares/roleMiddleware");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/",verifyToken, tryCatch(getAllDentist));
router.post("/",verifyToken, authorizeRoles("DOCTOR","ADMIN"), tryCatch(addDentist));

module.exports = router;