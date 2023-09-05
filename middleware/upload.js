const path = require('path');
const multer = require('multer');

// const createHttpError = require('http-errors');
// const uploadDir = path.join(process.cwd(), 'uploads');
// const storeImage = path.join(process.cwd(), 'images');
// const storeImage = path.join(__dirname, '../public');

const uploadDir = path.join(__dirname, '../public/avatar')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

const upload = multer({
    storage
});

module.exports = upload;