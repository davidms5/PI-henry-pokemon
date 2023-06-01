const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const cloudinaryStorage = multerCloudinary({
  cloudinary: cloudinary,
  params: {
    folder: 'your-folder-name',//crear la carpeta en cloudinary, y hacer pruebas
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

module.exports = cloudinaryStorage;