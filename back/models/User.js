/* importer mongoose */
const mongoose = require('mongoose');

/* package mongoDB pour contrôler l'unicité sur la BDD */
const uniqueValidator = require('mongoose-unique-validator');

/* créer un schéma de données utilisateurs */
const userSchema = mongoose.Schema({
    /* addresse mail doit être unique :  on ne peut pas s'inscrire plusieurs fois avec la même */
    name: { type: String, require: true},
    firstName: {type: String, require: true},
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true },
    picture: { type: String, require:true, default: '../images/user/random-user.jpg'},
    admin: { type: Boolean, default:false}
});

/* appliquer le plugin mongoose-unique-validator au schéma */
userSchema.plugin(uniqueValidator);

/* exporter ce schéma sous forme de modèle */
module.exports = mongoose.model('User', userSchema);