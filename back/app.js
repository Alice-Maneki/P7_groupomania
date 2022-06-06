/* importer express */
const express = require('express');
/* importer morgan: log des requêtes HTTP pour Node.js */
const morgan = require('morgan');
/* connexion BDD MongoDB */
const mongoose = require('./DB/db');

/* on appelle la méthode express pour notre application */
const app = express();

const path = require('path');

/* importer les routes */
const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/user');

/* log des req et res */
app.use(morgan('dev'));

/* debug mongoose */
mongoose.set('debug', true );

/* accéder au corps de la requête: middleware qui intercepte toutes les requêtes qui ont un content-type json et met à disposition le contenu dans req.body
remplace bodyParser dans les nouvelles versions d'express */
app.use(express.json());

/* CORS : système de sécurité qui,par défaut,bloque les appels HTTP entre 2serveurs différents. on ajoute des headers à notre objet response 
    >permet d'accéder à notre API depuis n'importe quel origine
    >ajout des headers mentionnés aux requêtes envoyées vers notre API
    >envoie des requêtes avec les méthodes mentionnées 
middleware général : appliqué à toutes les routes de notre serveur */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next();
  });


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/article', articleRoutes);
app.use('/api/auth', userRoutes);


/* on l'exporte pour pvr y accéder depuis les autres fichiers de notre projet */
module.exports = app;