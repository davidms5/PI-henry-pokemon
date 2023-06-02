
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const storageCloud = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: '/',
  allowed_formats: ['jpeg', 'png', 'jpg'],
  
});

module.exports = storageCloud;