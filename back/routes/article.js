/* logique de routing de l'app pour les articles */

/* importer express */
const express = require('express');

/* on crée un router avec la méthode d'express */
const router = express.Router();

const articleCtlr = require('../controllers/article');
const auth = require('../midleware/auth');
const multer = require('../midleware/multer-config');

/* créer un nouvel article */
router.post('/', auth, multer, articleCtlr.createArticle);

/* modification d'un article existant */
router.put('/:id', auth, multer, articleCtlr.modifyArticle);

/* supprimer un article existant */
router.delete('/:id', auth, articleCtlr.deleteArticle);

/* pouvoir trouver un seul objet dans la BDD par son id */
router.get('/:id', auth, articleCtlr.getOneArticle);

/* récupérer tous les articles dans la BDD */
router.get('/', auth, articleCtlr.getAllArticle);

/* gestion des likes/dislikes */
router.post('/:id/like', auth, articleCtlr.likeArticle);

/* on exporte le router */
module.exports = router;