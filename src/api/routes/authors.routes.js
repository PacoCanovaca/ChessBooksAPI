const express = require("express");
const { getAuthorsByName, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/authors.controller");
const router = express.Router();

router.get("/name", getAuthorsByName);
router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;