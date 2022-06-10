/* middleware d'authentification pour protéger mes routes */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

module.exports = (req, res,next) => {
    try {
        /* récupérer le token dans headers authorization : bearer token */
        const token = req.headers.authorization.split(' ')[1];
        /* décoder le token */
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
        /* récupérer userId du token décodé */
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Wrong User ID';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error || 'Request unauthorized'});
    }
};