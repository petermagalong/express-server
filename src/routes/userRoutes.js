const express = require("express");
const router = express.Router();
const authorizeRoles = require("../middlewares/roleMiddleware");
const verifyToken = require("../middlewares/authMiddleware");
const { getUserInfo, updateUser } = require("../controllers/authController");
const { tryCatch } = require("../utils/tryCatch");
const { AuthValidation } = require("../validations/authValidation");

// only admin can access this route
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.send("welcome admin");
});

//Both admin and manager can access this route
router.get("/manager", verifyToken, authorizeRoles("admin", "manager"), (req, res) => {
    res.send("welcome manager");
});

//All can access this route
router.get("/user", verifyToken, authorizeRoles("admin", "manager", "user"), (req, res) => {
    res.send("welcome user");
});  

router.get("/", verifyToken, tryCatch(getUserInfo));
router.put("/",verifyToken, tryCatch(updateUser,AuthValidation.updateUserValidate));

module.exports = router;
