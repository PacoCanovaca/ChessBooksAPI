const express = require("express");
const { getAuthorsByName, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/authors.controller");
const router = express.Router();

router.get("/name", getAuthorsByName);
router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", isAuth(["admin"]), createAuthor);
router.put("/:id", isAuth(["admin"]), updateAuthor);
router.delete("/:id", isAuth(["admin"]), deleteAuthor);

module.exports = router;