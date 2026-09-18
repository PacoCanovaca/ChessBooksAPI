const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema(
    {
        fullName: { type: String, required: true, trim: true },
        nationality: { type: String, trim: true },
        birthYear: { type: Number },
        passingYear: { type: Number },
        title: { type: String, enum: ["GM", "IM", "FM", "CM", "NM"] },
        books: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Book"
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;