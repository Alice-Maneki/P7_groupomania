/* logique de routing de l'app pour les commentaires */

/* importer express */
const express = require('express');

/* on crée un router avec la méthode d'express */
const router = express.Router();

const commentCtlr = require('../controllers/comment');
const auth = require('../midleware/auth');


/* créer un nouveau commentaire  */
router.post('/', auth, commentCtlr.createComment);

/* modification d'un commentaire existant */
router.put('/:id', auth, commentCtlr.modifyComment);

/* supprimer un commentaire existant */
router.delete('/:id', auth, commentCtlr.deleteComment);

/* pouvoir trouver un seul objet dans la BDD par son id */
router.get('/:id', auth, commentCtlr.getOneComment);

/* récupérer tous les commentaires dans la BDD */
router.get('/', auth, commentCtlr.getAllComment);

/* gestion des likes/dislikes */
router.post('/:id/like', auth, commentCtlr.likeComment);

/* on exporte le router */
module.exports = router;