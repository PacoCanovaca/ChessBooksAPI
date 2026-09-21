const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    updateUserInfo,
    deleteUser
} = require("../controllers/users.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", updateUserInfo);
router.delete("/delete/:id", deleteUser);

module.exports = router;