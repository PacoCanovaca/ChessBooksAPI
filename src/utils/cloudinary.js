const cloudinary = require("cloudinary").v2;

const deleteImgCloudinary = async (publicId) => {
    if (!publicId) return;
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.log(`Error deleting image with PublicId ${publicId}: ${err.message}`);
    }
};

module.exports = { deleteImgCloudinary };