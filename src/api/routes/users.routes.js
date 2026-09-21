const express = require("express");
const router = express.Router();
const {
    registerUser
} = require("../controllers/users.controller");

router.get("/register", registerUser);

module.exports = router;