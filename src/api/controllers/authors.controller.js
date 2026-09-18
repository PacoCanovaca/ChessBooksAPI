const Author = require("../models/author.model");

/* 
    - GET /api/authors -> para obtener todos los autores registrados
    - GET /api/authors/:id -> para obtener un autor por ID
    - GET /api/authors/name?name=nombre -> para obtener autores cuyo fullName contenga un fragmento de texto
    - POST /api/authors -> para crear un nuevo autor
    - PUT /api/authors/:id -> para modificar un autor existente
    - DELETE /api/authors/:id -> para eliminar un autor existente
*/

// GET /api/authors
const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ error: "Not able to get authors from the server", details: err.message })
    }
};

// GET /api/authors/:id
const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.status(200).json(author);
    } catch (err) {
        res.status(400).json({ error: "Incorrect ID or server issues", details: err.message });
    }
};

// POST /api/authors
const createAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json({ message: "Author created successfully", author: author });
    } catch (err) {
        res.status(400).json({ error: "Author can not be created", details: err.message });
    }
};

// PUT /api/authors/:id
const updateAuthor = async (req, res) => {
    try {
        const updated = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.status(200).json({ message: "Author updated successfully", updatedAuthor: updated});
    } catch (err) {
        res.status(400).json({ error: "Author can not be updated", details: err.message });
    }
};

// DELETE /api/authors/:id
const deleteAuthor = async (req, res) => {
    try {
        const deleted = await Author.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.status(200).json({ message: "Author deleted successfully", deletedAuthor: deleted})
    } catch (err) {
        res.status(400).json({ error: "Author can not be deleted", details: err.message })
    }
};

// GET /api/authors/name?name=nombre
const getAuthorsByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: "You must include ?name= followed by the first or last name of the author you are looking for" });
        }
        const authors = await Author.find({ fullName: new RegExp(name, "i") });
        if (!authors.length) {
            return res.status(200).json({ message: "No authors found by that name" });
        }
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ error: "Not able to get authors from the Server", details: err.message });
    }
};

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthorsByName
};