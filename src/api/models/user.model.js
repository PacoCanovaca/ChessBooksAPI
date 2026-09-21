const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, trim: true, required: true },
        photo: { type: String, trim: true },
        password: {
            type: String,
            trim: true,
            required: true,
            minLength: [8, "La contraseña debe tener al menos 8 caracteres"]
        },
        email: { type: String, trim: true, required: true, unique: true },
        role: { 
            type: String, 
            trim: true, 
            required: true, 
            enum: ["admin", "user"]
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;