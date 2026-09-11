const Book = require("../models/book.model");

/* Endpoints a desarrollar:
    - GET /api/books -> para obtener todos los libros registrados
    - GET /api/books/:id -> para obtener un libro por ID
    - GET /api/books?title=tituloQueSeBusca -> para obtener libros por título (o fragmento del título). Devuelve todos los que cumplan con el fragmento
    - GET /api/books?language=idiomaParaFiltrar -> para filtrar libros por idioma
    - GET /api/books?author=autorQueSeBusca -> para filtrar libros por autor
    - GET /api/books?minYear=añoMínimo&maxYear=añoMáximo -> para filtrar por un rango de año de publicación. Requiere de comando concreto dentro del controller relacionado con MongoDB, está en ChatGPT
    - GET /api/books?minYear=añoMínimo -> para filtrar libros publicados después del año indicado
    - GET /api/books?maxYear=añoMáximo -> para filtrar libros publicados antes del año indicado
    - POST /api/books -> para crear un registro de libro nuevo
    - PUT /api/books/:id -> para modificar un libro
    - PATCH /api/books/:id -> para modificar un libro añadiendo algún dato (sin tocar lo demás). Sirve sobre todo para añadir elementos en las propiedades que contienen arrays (con PUT habría que añadir el array con los elementos que ya estaban y los nuevos) - Requiere de comando concreto dentro del controller relacionado con MongoDB, está en ChatGPT
    - DELETE /api/books/:id -> para eliminar un libro
*/

// GET /api/books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Not able to get books from the server" });
    }
};

// GET /api/books/:id
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: "Incorrect ID or server issues", details: err.message });
    }
};

// POST /api/books
const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ message: "Book created successfully", book: book });
    } catch (err) {
        res.status(400).json({ error: "Book can not be created", details: err.message });
    }
};

// PUT /api/books/:id
const updateBook = async (req, res) => {
    try {
        const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book updated successfully", updatedBook: updated});
    } catch (err) {
        res.status(400).json({ error: "Book can not be updated", details: err.message });
    }
};

// DELETE /api/books/:id
const deleteBook = async (req, res) => {
    try {
        const deleted = await Book.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully", deletedBook: deleted})
    } catch (err) {
        res.status(400).json({ error: "Book can not be deleted", details: err.message })
    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}