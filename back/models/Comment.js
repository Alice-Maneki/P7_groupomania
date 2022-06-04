/* création d'un commentaire sous un post par les utilisateurs */

/* importer mongoose */
const mongoose = require('mongoose');
const model = require('./User');

/* schéma de données pour le commentaire */
const commentSchema = mongoose.Schema({
    articleId: { },
    description: { type: String, require: true},
   // imageUrl: { type: String, require: true},
    userId: { type: String, require: true},
    create_at: { type: Date, require: true, default: Date.now},
    update_at: { type: Date, require: true, default: Date.now},
    likes: { type: Number, default:0 }, 
    dislikes: { type: Number, default:0 }, 
});

/* exporter le schéma */
module.exports = mongoose.model('Comment', commentSchema);