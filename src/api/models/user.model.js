const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, trim: true, required: true },
        image: { 
            imgUrl: { type: String, trim: true },
            imgId: { type: String, trim: true }, 
        },
        password: {
            type: String,
            trim: true,
            required: true,
            minLength: [8, "Password must have at least 8 characters"]
        },
        email: { type: String, trim: true, required: true, unique: true },
        role: { 
            type: String, 
            trim: true, 
            required: true, 
            enum: ["admin", "user"]
        },
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next;
});

const User = mongoose.model("User", userSchema);

module.exports = User;