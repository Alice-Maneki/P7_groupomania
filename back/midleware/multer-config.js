/* importer multer */
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/* créer un objet de config pour multer avec
-la destination de stockage du fichier
-un nom de fichier unique */
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        /* supprimer les espaces dans le nom du fichier original */
        const name = file.originalname.split(' ').join('_');
        /* ajout d'un extension au fichier   */
        const extension = MIME_TYPES[file.mimetype];
        /* création d'un nom unique */
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');