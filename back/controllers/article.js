/* logique métier de l'app pour les articles */

/* importer article.js de models */
const Article = require('../models/Article');
const multer = require('../midleware/multer-config');
/* importer package file system de Node pour accéder aux opérations liées au système de fichiers */
const fs = require('fs');
const objectId = require('mongoose').Types.ObjectId;
const modelUser = require('../models/User');

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
        /*.then((article) => {
            const filename = article.imageUrl.split('/images/')[1];
           fs.unlink(`images/${filename}`, () => { 
                Article.findOne({ _id: req.params.id })*/
                    .then((article) => {
                        /*if (!article) {
                            return res.status(404).json({ error: new Error('Non existant object') });
                        } if (article.userId !== req.auth.userId) {
                            return res.status(401).json({ error: new Error('Request unahtorized !') });
                        }*/
                    
                        Article.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Article successfully deleted' }))
                            .catch(error => res.status(400).json({ error }));
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

exports.likeArticle =(req, res, next) => {
    try {
        Article.findById(req.params.id)
        /* est ce que l'utilisateur a déjà aimé l'article? */
        .then((article) => {
            if(article.usersLiked.includes(req.body.userID)){
                return res.json(400).json({ msg: 'Already liked '});
            } else {
                Article.updateOne(
                    {
                        $push: { usersLiked: req.body.userId}
        
                    }
                )
                    .then(() => res.status(201).json({ message: 'Like +1!' }))
                    .catch(error => res.status(400).json({ error }));
            }        
        })
        .catch(error => res.status(400).json({ error }));
    } catch(err) {
        res.status(500).send('server error');
    }
};

exports.unlikeArticle =(req, res, next) => {
    try {
        Article.findById(req.params.id)
        /* est ce que l'utilisateur a déjà aimé l'article? */
        .then((article) => {
            if(article.usersLiked.includes(req.body.userID)){
                Article.updateOne(
                   
                    {   
                        $pull: {usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: 'Like -1!' }))
                    .catch(error => res.status(400).json({ error }));  
            } 
                         
                   
        })
        .catch(error => res.status(400).json({ error }));
    } catch(err) {
        res.status(500).send('server error');
    }
};
    


/* gestion des commentaires : indentés sur les articles grâce à mongoDB */
/* créer un nouveau commentaire */
exports.commentArticle = (req, res, next) => {
    try {
        return Article.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        text: req.body.text,
                        timestamp: new Date().now,
                    }
                }
            },
        {new : true})
            .then((data) => res.send(data))
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