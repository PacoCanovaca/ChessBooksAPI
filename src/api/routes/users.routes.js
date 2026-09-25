const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    updateUserInfo,
    deleteUser,
    getUsers,
    getUserById
} = require("../controllers/users.controller");
const isAuth = require("../../middlewares/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", updateUserInfo);
router.delete("/delete/:id", isAuth(["admin"]), deleteUser);
router.get("/", isAuth(["admin"]), getUsers);
router.get("/:id", isAuth(["admin"]), getUserById);

module.exports = router;