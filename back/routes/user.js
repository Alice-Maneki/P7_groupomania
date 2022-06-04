const express = require('express');
const router = express.Router();

/* importer la logique métier */
const userCtlr = require('../controllers/user');
/* importer le middleware pour le password */
const password = require('../midleware/password');

router.post('/signup',password, userCtlr.signup);
router.post('/login', userCtlr.login);

module.exports = router;