const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        synopsis: { type: String, trim: true },
        year: { type: Number, required: true, min: 1400, max: 2100 },
        language: { 
            type: String, 
            required: true, 
            enum: [
                "English",
                "Chinese",
                "Spanish",
                "German",
                "French",
                "Japanese",
                "Russian",
                "Italian",
                "Portuguese",
                "Korean",
                "Arabic",
                "Dutch",
                "Polish",
                "Swedish",
                "Czech",
                "Greek",
                "Turkish",
                "Ukrainian",
                "Danish",
                "Norwegian"
            ] },
        authors: { 
            type: [String], 
            required: true,
            validate: {
                validator: (authors) => authors.length > 0,
                message: "A book must have at least one author"
            }
        },
        purchase_links: { type: [String] },
        book_images: { type: [String] },
        publisher: { type: String, required: true, trim: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;