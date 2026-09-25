const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const bookStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ChessBooks/books",
        allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"]
    }
});

const userStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ChessBooks/users",
        allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"]
    }
});

const uploadBook = multer({ storage: bookStorage });
const uploadUser = multer({ storage: userStorage });

module.exports = { uploadBook, uploadUser };