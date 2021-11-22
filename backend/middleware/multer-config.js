const multer = require('multer');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'video/mp4': 'mp4',
    'video/avi': 'avi',
    'video/mkv': 'mkv',
    'video/mov': 'mov'
}
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        
        if(file.mimetype.startsWith('image')){
            callback(null, 'images')
        }else{
            callback(null, 'videos')
        }
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('file');