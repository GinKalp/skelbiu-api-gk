const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        // cb(null, uniqueSuffix + '.png')
        cb(null, uniqueSuffix + path.extname(file.originalname))

    }
})

const upload = multer({ storage: storage })

function imageUploader(){
    return upload.single('image')
}

module.exports = {
    imageUploader
}