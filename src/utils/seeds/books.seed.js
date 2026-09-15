const mongoose = require("mongoose");
const Book = require("../../api/models/book.model");
const bookSeed = require("../../data/books");

require("dotenv").config();

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        const books = await Book.find();
        if (books.length) {
            await Book.collection.drop();
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        await Book.insertMany(bookSeed);
    })
    .catch((err) => console.log(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());