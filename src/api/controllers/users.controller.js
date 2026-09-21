const User = require("../models/user.model");

/* Endpoints a desarrollar:
    - POST /api/users/register -> registrar un nuevo usuario
    - POST /api/users/login -> hacer un login
    - PUT /api/users/update/:id -> actualizar información de un usuario (para userName, imagen de perfil y contraseña)
    - DELETE /api/users/delete/:id -> eliminar un usuario
*/

// POST /api/users/register
const registerUser = async(req, res) => {
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

module.exports = {
    registerUser
}