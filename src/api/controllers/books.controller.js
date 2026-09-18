const Book = require("../models/book.model");

/* Endpoints a desarrollar:
    - GET /api/books -> para obtener todos los libros registrados
    - GET /api/books/:id -> para obtener un libro por ID
    - GET /api/books/filterTitle?title=tituloQueSeBusca -> para obtener libros por título (o fragmento del título). Devuelve todos los que cumplan con el fragmento
    - GET /api/books/filterLanguage?language=idiomaParaFiltrar -> para filtrar libros por idioma
    - GET /api/books/filterAuthor?author=autorQueSeBusca -> para filtrar libros por autor
    - GET /api/books/yearRange?minYear=añoMínimo&maxYear=añoMáximo -> para filtrar por un rango de año de publicación. Requiere de comando concreto dentro del controller relacionado con MongoDB, está en ChatGPT
    - POST /api/books -> para crear un registro de libro nuevo
    - PUT /api/books/:id -> para modificar un libro
    - PATCH /api/books/:id -> para modificar un libro añadiendo algún dato (sin tocar lo demás). Sirve sobre todo para añadir elementos en las propiedades que contienen arrays (con PUT habría que añadir el array con los elementos que ya estaban y los nuevos) - Requiere de comando concreto dentro del controller relacionado con MongoDB, está en ChatGPT
    - DELETE /api/books/:id -> para eliminar un libro
*/

// GET /api/books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("authors");
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Not able to get books from the server", details: err.message });
    }
};

// GET /api/books/:id
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("authors");
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

// GET /api/books/filterTitle?title=tituloQueSeBusca
const getBooksByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: "You must include ?title= followed by the title you are looking for" });
        }
        const books = await Book.find({ title: new RegExp(title, "i") }).populate("authors");
        if (!books.length) {
            return res.status(200).json({ message: "No books found by that title" });
        }
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Not able to get books from the Server", details: err.message });
    }
};

// GET /api/books/filterLanguage?language=idiomaParaFiltrar
const getBooksByLanguage = async (req, res) => {
    try {
        const { language } = req.query;
        if (!language) {
            return res.status(400).json({ error: "You must include ?language= followed by the language you are looking for" });
        }
        const books = await Book.find({ language: new RegExp(language, "i") }).populate("authors");
        if (!books.length) {
            return res.status(200).json({ message: "No books found in that language" });
        }
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Not able to get books from the Server", details: err.message });
    }
};

// GET /api/books/filterAuthor?author=idAutorQueSeBusca
const getBooksByAuthor = async (req, res) => {
    try {
        const { author } = req.query;
        if (!author) {
            return res.status(400).json({ error: "You must include ?author= followed by the id of the author you are looking for" });
        }
        const books = await Book.find({ authors: new RegExp(author, "i") }).populate("authors");
        if (!books.length) {
            return res.status(200).json({ message: "No books written by that author in the DB" });
        }
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Not able to get books from the Server", details: err.message });
    }
};

// GET /api/books/yearRange?minYear=añoMínimo&maxYear=añoMáximo
const getBooksByYearRange = async (req, res) => {
    try {
        let { minYear = 1400, maxYear = 2100 } = req.query;
        if(minYear === "") minYear = 1400;
        if(maxYear === "") maxYear = 2100;
        const parsedMin = parseInt(minYear);
        const parsedMax = parseInt(maxYear);
        if (Number.isNaN(parsedMin) || Number.isNaN(parsedMax)) {
            return res.status(400).json({ error: "minYear and maxYear must be valid numbers" });
        }
        const books = await Book.find({ year: { $gte: parsedMin, $lte: parsedMax }  }).populate("authors");
        if(!books.length) {
            return res.status(200).json({ message: "No books published in that year range" });
        }
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Not able to get books from the Server", details: err.message })
    }
};

// PATCH /api/books/addAuthor/:id
const addAuthorToBook = async (req, res) => {
    try {
        const { addAuthor } = req.body;
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        if (book.authors.some(author => author === addAuthor)) {
            return res.status(400).json({ error: "The author included already exists" });
        }
        const updatedBook = await Book.findByIdAndUpdate(
            id, 
            { $push: { authors: addAuthor } }, 
            { 
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({ message: "Book updated successfully", updatedBook: updatedBook});
    } catch (err) {
        res.status(400).json({ error: "Book can not be updated", details: err.message });
    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getBooksByTitle,
    getBooksByLanguage,
    getBooksByAuthor,
    getBooksByYearRange,
    addAuthorToBook
};