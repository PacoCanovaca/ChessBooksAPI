const express = require("express");
const router = express.Router();
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getBooksByTitle,
    getBooksByLanguage,
    getBooksByAuthor,
    getBooksByYearRange,
    addAuthorToBook,
} = require("../controllers/books.controller");
const isAuth = require("../../middlewares/auth.middleware");
const { uploadBook }= require("../../middlewares/file.middleware");

// Rutas de controladores avanzados
router.get("/filterTitle", getBooksByTitle);
router.get("/filterLanguage", getBooksByLanguage);
router.get("/filterAuthor", getBooksByAuthor);
router.get("/yearRange", getBooksByYearRange);
router.patch("/addAuthor/:id", isAuth(["admin"]), addAuthorToBook);

// Rutas de controladores básicos
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", isAuth(["admin"]), uploadBook.single("img"), createBook);
router.put("/:id", isAuth(["admin"]), uploadBook.single("img"), updateBook);
router.delete("/:id", isAuth(["admin"]), deleteBook);

module.exports = router;