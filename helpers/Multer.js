const multer = require("multer");
const path = require('path');

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const p = path.join(__dirname, '../public/metroland/assets/image_news_thubnail/')
        console.log(p)
        cb(null, p);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload;