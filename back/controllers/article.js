/* logique métier de l'app pour les articles */

/* importer article.js de models */
const Article = require('../models/Article');
/* importer package file system de Node pour accéder aux opérations liées au système de fichiers */
const fs = require('fs');


/* créer un nouvel article */
exports.createArticle = (req, res, next) => {
    const articleObject = JSON.parse(req.body.article);
    delete articleObject._id;
    const article = new Article({
      ...articleObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    article.save()
      .then(() => res.status(201).json({ message: 'Article créé !'}))
      .catch(error => res.status(400).json({ error }));
  };

/* modification d'un article existant */
exports.modifyArticle = (req,res,next) => {
    const articleObject = req.file ?
        {
            ...JSON.parse(req.body.article),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
         } : { ...req.body };
    Article.updateOne({ _id: req.params.id}, {...articleObject, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Article modifié'}))
    .catch(error => res.status(400).json({ error }));
};

/* supprimer un article existant */
exports.deleteArticle = (req,res,next) => {
    Article.findOne({ _id: req.params.id })
        .then(article => {
            const filename = article.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Article.findOne({ _id: req.params.id })
                    .then((article) => {
                        if(!article){
                            return res.status(404).json({ error: new Error('Objet non trouvé!')});
                        } if (article.userId !== req.auth.userId){
                            return res.status(401).json({ error: new Error('Requête non autorisée !')});
                        }
                Article.deleteOne( { _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Article Supprimé'}))
                    .catch(error => res.status(400).json({ error })); 
            });
        });
    })
        .catch(error => res.status(500).json({ error }));
    
};

/* pouvoir trouver un seul objet dans la BDD par son id */
exports.getOneArticle = (req,res,next) => {
    Article.findOne({ _id: req.params.id})
        .then(article => res.status(200).json(article))
        .catch(error => res.status(404).json({ error }));
};

/* récupérer tous les articles de la BDD */
exports.getAllArticle = (req,res, next) => {
    Article.find()
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error }));
};

/* gestion des likes et dislikes */
exports.likeArticle =(req, res, next) => {
    /* la requête sera envoyée par body---> raw au format JSOn avec 2 propriétés :
    { "userID":"",
       "like": 1 ou 0 ou -1} */
    Article.findOne({_id: req.params.id})
      .then((article) => { 
          /* like =1 (likes +1 : aime l'article) : ajouter l'userId dans le tableau des likes */
          /* méthode JavaScript includes() 
          opérateurs mongoDB $inc 
                             $push 
                             $pull  */
          if(!article.usersLiked.includes(req.body.userId) && req.body.like === 1){
          /* userId n'est pas présent dans le usersLiked de la base de données */
          /* mise à jour de la BDD */
              Article.updateOne(
                  {_id: req.params.id},
                  {
                      $inc: {likes: 1},
                      $push: {usersLiked: req.body.userId}
                  }
              )
                  .then(() => res.status(201).json({ message: 'Like +1!' }))
                  .catch(error => res.status(400).json({ error }));
          }

          /* like =0 (likes =0 : pas d'avis) */
          if(article.usersLiked.includes(req.body.userId) && req.body.like === 0){
              /* userId est présent dans le usersLiked de la base de données mais on veut like =0 */
              /* mise à jour de la BDD */
                  Article.updateOne(
                      {_id: req.params.id},
                      {
                          $inc: {likes: -1},
                          $pull: {usersLiked: req.body.userId}
                      }
                  )
                      .then(() => res.status(201).json({ message: 'Like -1!' }))
                      .catch(error => res.status(400).json({ error }));
              }

          /* like =-1 (dislikes +1 : n'aime PAS l'article) */
          if(!article.usersDisliked.includes(req.body.userId) && req.body.like === -1){
              /* userId est présent dans le usersDisliked de la base de données ET dislikes =1 */
              /* mise à jour de la BDD */
                  Article.updateOne(
                      {_id: req.params.id},
                      {
                          $inc: {dislikes: 1},
                          $push: {usersDisliked: req.body.userId}
                      }
                  )
                      .then(() => res.status(201).json({ message: 'Dislike +1!' }))
                      .catch(error => res.status(400).json({ error }));
              }

          /* like =0 (dislikes =0 : pas de vote) */
          if(article.usersDisliked.includes(req.body.userId) && req.body.like === 0){
              /* userId est présent dans le usersLiked de la base de données mais on veut like =0 */
              /* mise à jour de la BDD */
                  Article.updateOne(
                      {_id: req.params.id},
                      {
                          $inc: {dislikes: -1},
                          $pull: {usersDisliked: req.body.userId}
                      }
                  )
                      .then(() => res.status(201).json({ message: 'Dislike -1!' }))
                      .catch(error => res.status(400).json({ error }));
              }

      })  
      .catch(error => res.status(404).json({ error }));
   
};