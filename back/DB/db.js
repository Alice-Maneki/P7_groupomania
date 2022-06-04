/* importer le package pour utiliser les variables d'environnements */
const dotenv = require('dotenv');
const result = dotenv.config();

/* importer mongoose pour se connecter à la BDD */
const mongoose = require('mongoose');

/* connecter l'API au cluster MongoDB */
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.v5qih.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=> console.log('Connexion à MongoDB réussie'))
    .catch(()=> console.log('Connexion à MongoDB échouée'));
  
  
module.exports = mongoose;      