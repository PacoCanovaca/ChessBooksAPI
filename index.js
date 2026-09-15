require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const booksRouter = require("./src/api/routes/books.routes");

const app = express();
connectDB();

app.use(express.json());

app.use("/api/books", booksRouter);

app.use((req, res, next) => {
    res.status(404).json("Route not found");
});

app.listen(3000, () => {
    console.log("Server listening: http://localhost:3000")
});