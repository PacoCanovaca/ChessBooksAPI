const User = require("../api/models/user.model");
const { verifyToken } = require("../utils/token");

const isAuth = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ error: "Token not received" });
            }
            const decoded = verifyToken(token);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ error: "Invalid token or user not found" });
            }
            user.password = null;
            req.user = user;
            if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
                return res.status(403).json({ error: "Access denied" });
            }
            next();
        } catch (err) {
            res.status(401).json({ error: "Invalid token or expired session", details: err.message });
        }
    }
};

module.exports = isAuth;