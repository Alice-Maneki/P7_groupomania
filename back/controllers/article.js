/* logique métier de l'app pour les articles */

/* importer article.js de models */
const Article = require('../models/Article');
const multer = require('../midleware/multer-config');
/* importer package file system de Node pour accéder aux opérations liées au système de fichiers */
const fs = require('fs');
const objectId = require('mongoose').Types.ObjectId;

/* créer un nouvel article */
exports.createArticle = (req, res, next) => {
    
    const newArticle = new Article({
        userId: req.body.userId,
        message: req.body.message, 
        /* il faut récupérer les segments de l'URL où se trouve notre image */
       /* imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` */
    });
    newArticle.save()
        .then(() => res.status(201).json({ message: 'Article successfully created !' }))
        .catch(error => res.status(400).json({ error }));
};

/* modification d'un article existant */
exports.modifyArticle = (req, res, next) => {
    if (!objectId) {
        return res.status(400).json({ message: "User unknown" });
    }
    const updatedmessage = { message: req.body.message };

    Article.findByIdAndUpdate(req.params.id,
        { $set: updatedmessage }, { new: true })
        .then(() => res.status(200).json({ message: 'Article successfully updated' }))
        .catch(error => res.status(400).json({ error }));
};

/* supprimer un article existant */
exports.deleteArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then(article => {
            const filename = article.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Article.findOne({ _id: req.params.id })
                    .then((article) => {
                        if (!article) {
                            return res.status(404).json({ error: new Error('Non existant object') });
                        } if (article.userId !== req.auth.userId) {
                            return res.status(401).json({ error: new Error('Request unahtorized !') });
                        }
                        Article.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Article successfully deleted' }))
                            .catch(error => res.status(400).json({ error }));
                    });
            });
        })
        .catch(error => res.status(500).json({ error }));

};


/* récupérer tous les articles de la BDD et les trier par ordre antéchronologique :
du plus récent au plus ancien */
exports.getAllArticle = (req, res, next) => {
    Article.find().sort({ createdAt : -1 })
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error }));
};

/* gestion des likes */
exports.likeArticle = (req, res, next) => {
    /* la requête sera envoyée par body---> raw au format JSOn avec 2 propriétés :
    { "userID":"",
       "like": 1 ou 0 ou -1} */
    Article.findOne({ _id: req.params.id })
        .then((article) => {
            /* like =1 (likes +1 : aime l'article) : ajouter l'userId dans le tableau des likes */
            /* méthode JavaScript includes() 
            opérateurs mongoDB $inc 
                               $push 
                               $pull  */
            if (!article.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                /* userId n'est pas présent dans le usersLiked de la base de données */
                /* mise à jour de la BDD */
                Article.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: 'Like +1!' }))
                    .catch(error => res.status(400).json({ error }));
            }

            /* like =0 (likes =0 : pas d'avis) */
            if (article.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                /* userId est présent dans le usersLiked de la base de données mais on veut like =0 */
                /* mise à jour de la BDD */
                Article.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: 'Like -1!' }))
                    .catch(error => res.status(400).json({ error }));
            }


        })
        .catch(error => res.status(404).json({ error }));

};

/* gestion des commentaires : indentés sur les articles grâce à mongoDB */
/* créer un nouveau commentaire */
exports.commentArticle = (req, res, next) => {
    if (!objectId) {
        return res.status(400).json({ message: "User unknown" });
    }
    try {
        return Article.findByIdAndUpdate(
            req.params.id,
            {
                push: {
                    comments: {
                        commentId: req.body.commentId,
                        commenterName: req.body.commenterName,
                        text: req.body.text,
                        timestamp: new Date.now
                    }
                }
            }
        )
            .then(() => res.status(201).json({ message: 'Comment successfully created !' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        return res.status(400).json({ error });
    }
};

/* modifier un commentaire */
exports.commentEdit = (req, res, next) => {
    if (!objectId) {
        return res.status(400).json({ message: "User unknown" });
    }
    try {
        return Article.findById(
            req.params.id,
            (error, docs) => {
                const theComment = docs.comments.find((comment) => (
                    comment._id.equals(req.body.commentId)
                ));

                if (!theComment) return res.status(404).json({ message: 'comment not found' });
                theComment.text = req.body.text;

                return docs.save((error) => {
                    if (!error) return res.status(200).json(docs);
                    return res.status(500).json({ error });
                })

            }
        )
    } catch (error) {
        return res.status(400).json({ error });
    }
};

/* supprimer un commentaire */
exports.commentDelete = (req, res, next) => {
    if (!objectId) {
        return res.status(400).json({ message: "User unknown" });
    }

    try {
        return Article.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { comments: { _id: req.body.commentId}}
            }
        )
            .then(() => res.status(200).json({ message: 'Comment successfully deleted !' }))
            .catch(error => res.status(400).json({ error }));
    }catch(error){
        return res.status(400).json({ error });
    }
};