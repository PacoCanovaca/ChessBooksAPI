require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("../../api/models/book.model");
const Author = require("../../api/models/author.model");
const { authorsSeed, booksSeed } = require("../../data/books");

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        const books = await Book.find();
        if (books.length) {
            await Book.collection.drop();
            console.log("Books data reset");
        }

        const authors = await Author.find();
        if (authors.length) {
            await Author.collection.drop();
            console.log("Authors data reset");
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        await Author.insertMany(authorsSeed);
        console.log("Authors created successfully.");

        await Book.insertMany(booksSeed);
        console.log("Books created successfully.");
    })
    .catch((err) => console.log(`Error creating data: ${err}`))
    .finally(() => {
        mongoose.disconnect();
    });