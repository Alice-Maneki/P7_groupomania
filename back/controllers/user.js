/* importer bcrypt qui nous permet de hacher les mdp */
const bcrypt = require('bcrypt');
/* importer le package crypto-js pour chiffrer l'email */
const cryptoJs = require('crypto-js');
/* importer jwt */
const jwt = require('jsonwebtoken');
/* importer dotenv pour utiliser les var d'env */
const dotenv = require('dotenv');
const result = dotenv.config();

/* importer le model de la BDD */
const User = require('../models/User');
const objectId = require('mongoose').Types.ObjectId;

/* enregistrer un nouvel utilisateur: création d'un compte */
exports.signup = (req,res,next) => {
    /* chiffrer l'email avant de l'envoyer dans la BDD */
   // const emailCryptoJS = cryptoJs.HmacSHA256.encrypt(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    /* hacher les mdp : fn asynchrone qui prend du temps + salt : cb de fois on exécute l'algorithme de hachage */
    bcrypt.hash(req.body.password, 10)
    /* on crée un utilisateur et on l'enregistre dans la BDD en remplaçant le mdp par le hsh créé et le mail pas sa version chiffrée */
        .then(hash => {
            const user = new User({
                name: req.body.name,
                firstName: req.body.firstName,
                email: req.body.email,
                password: hash,
                picture: '../images/user/random-user.jpg'
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User successfully created '}))
                .catch(error => res.status(400).json({ error }));
              
        })
        .catch(error => res.status(500).json({ error }));
};

/* connecter un utilisateur existant */
exports.login = (req,res,next) => {
    /* chiffer l'email */
   // const emailCryptoJS = CryptoJS.HmacSHA256.encrypt(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    /* on contrôle si le mail est bien présent dans la BD */
    User.findOne({ email: req.body.email })
        .then(user => {
            /* l'utilisateur n'est pas trouvé dans la base de données */
            if(!user) {
                return res.status(401).json({ error: 'User unknown'});
            }
            /* l'utilisateur est trouvé est on utilise bcrypt pour comparer le mot de passe enregistré et le mdp tapé */
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({ error: 'Password unknown'});
                    }
                    /* renvoie l' _id de l'utilisateur depuis la base de données et un token web JSON signé 
                    (contenant également l' _id de l'utilisateur) */
                    res.status(200).json({
                        userId: user._id,
                        /* fonction sign() de jsonwebtoken pour encoder un nouveau token qui contient : 
                        -ID utilisateur
                        -une chaîne secrète de dvpt temporaire 
                        -sa durée de validité */
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.JWT_KEY_TOKEN}`,
                            { expiresIn: '12h' }
            
                        )
                    });
                })
                .catch(error => res.status(500).json({ error}));
        })
        .catch(error => res.status(500).json({ error}));
};



/* gestion des utilisateurs par l'admin */
/* récupérer tous les utilisateurs de la base de données */
exports.getAllUsers = ((req,res,next) =>{
    User.find().select('-password')
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
});

/* récupérer un utilisateur via son id */
exports.getOneUser = ((req,res,next) => {
    User.findOne({ _id: req.params.id}).select('-password')
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
});

/* désactiver/supprimer un compte utilisateur */
exports.deleteUser = async (req,res,next) => {
    if(!objectId){
        return res.status(400).json({ message: "User unknown"});
    }
    try {
        await User.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "User successfully deleted "});
    } catch(error) {
        return res.status(500).json({ error });
    }  
};