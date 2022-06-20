/* importer password-validator: pour contrôler la force du mdp créé par l'utilisateur */
const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

/* le mdp doit respecter les règles suivantes : */
passwordSchema
    .is().min(5)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd']);

/* vérification de la qualité du password / au schéma : s'il est bon OK, sinon message d'erreur */
module.exports = (req,res,next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else {
        return res.status(400).json({ error: `Password must contain ${passwordSchema.validate( req.body.password, {list: true})}` });
    }
};