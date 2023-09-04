const multer = require('multer');
const path = require('path');

const uploadDir = path.join(process.cwd(), 'uploads');
// const storeImage = path.join(process.cwd(), 'images');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // cb(null, uniqueSuffix + '-' + file.originalname);
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage
});

module.exports = upload;