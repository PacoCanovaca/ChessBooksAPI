const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token.js");

/* Endpoints a desarrollar:
    - POST /api/users/register -> registrar un nuevo usuario
    - POST /api/users/login -> hacer un login
        - PUT /api/users/update/:id -> actualizar información de un usuario (para userName, imagen de perfil y contraseña)
        - DELETE /api/users/delete/:id -> eliminar un usuario
*/

// POST /api/users/register
const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const mailExists = await User.findOne({ email: user.email });
        const usernameExists = await User.findOne({ username: user.username });
        if (mailExists || usernameExists) {
            return res.status(400).json({ error: "Mail and/or Username already registered" })
        }
        const registeredUser = await user.save();
        res.status(201).json({ message: "User registered successfully", user: registeredUser });
    } catch (err) {
        res.status(400).json({ error: "Register can not be completed", details: err.message });
    }
};

// POST /api/users/login
const loginUser = async (req, res) => {
    try {
        const loginInfo = req.body;
        const user = await User.findOne({ email: loginInfo.email });
        if (!user) {
            return res.status(400).json({ error: "Email not registered" });
        }
        const validPassword = bcrypt.compareSync(loginInfo.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Incorrect Password" });
        }
        const token = generateToken(user._id, user.email);
        return res.status(200).json(token);
    } catch (err) {
        res.status(400).json({ error: "Login can not be completed", details: err.message });
    }
};

// PUT /api/users/update/:id
const updateUserInfo = async (req, res) => {
    try { 
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", updatedUser: updated })
    } catch (err) {
        res.status(400).json({ error: "User can not be updated", details: err.message });
    }
};

// DELETE /api/users/delete/:id
const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", deletedUser: deleted });
    } catch (err) {
        res.status(400).json({ error: "User can not be deleted", details: err.message })
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUserInfo,
    deleteUser
};