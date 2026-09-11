const express = require("express");
const router = express.Router();
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require("../controllers/books.controller");

// Rutas de controladores básicos
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;