const express = require('express');
const router = express.Router();

/* importer la logique métier */
const userCtlr = require('../controllers/user');
/* importer le middleware pour le password */
const password = require('../midleware/password');
const auth = require('../midleware/auth');
const multer = require('../midleware/multer-config');

/* création ou connexion d'un utilisateur */
router.post('/signup',password, multer, userCtlr.signup);
router.post('/login', userCtlr.login);

/* gestion des données utilisateur par l'admin */
router.get('/user',auth, userCtlr.getAllUsers);
router.get('/user/:id',auth, userCtlr.getOneUser);
router.delete('/user/:id', auth, userCtlr.deleteUser);


module.exports = router;