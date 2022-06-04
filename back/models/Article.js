/* création d'un post par les utilisateurs */

/* importer mongoose */
const mongoose = require('mongoose');
const model = require('./User');

/* création d'un schéma de données */
const articleSchema = mongoose.Schema({
    articleId: { },
    description: { type: String, require: true},
    imageUrl: { type: String, require: true},
    userId: { type: String, require: true},
    create_at: { type: Date, require: true, default: Date.now},
    update_at: { type: Date, require: true, default: Date.now},
    likes: { type: Number, default:0 }, 
    dislikes: { type: Number, default:0 }, 
    
});

module.exports = mongoose.model('Article', articleSchema);