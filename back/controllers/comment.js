/* logique métier de l'app pour les commentaires */

/* importer comment.js de models */
const Comment = require('../models/Comment');
/* importer package file system de Node pour accéder aux opérations liées au système de fichiers */
const fs = require('fs');


/* créer un nouveau commentaire */
exports.createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);
    delete commentObject._id;
    const comment = new Comment({
      ...commentObject,
     // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    article.save()
      .then(() => res.status(201).json({ message: 'Commentaire créé !'}))
      .catch(error => res.status(400).json({ error }));
  };

/* modification d'un commentaire existant */
exports.modifyComment = (req,res,next) => {
    const commentObject = req.file ?
        {
            ...JSON.parse(req.body.comment),
            // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
         } : { ...req.body };
    Comment.updateOne({ _id: req.params.id}, {...commentObject, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Commentaire modifié'}))
    .catch(error => res.status(400).json({ error }));
};

/* supprimer un commentaire existant */
exports.deleteComment = (req,res,next) => {
    Comment.findOne({ _id: req.params.id })
        //.then(comment => {
          //  const filename = comment.imageUrl.split('/images/')[1];
          //  fs.unlink(`images/${filename}`, () => {
             //   Comment.findOne({ _id: req.params.id })
                    .then((comment) => {
                        if(!comment){
                            return res.status(404).json({ error: new Error('Objet non trouvé!')});
                        } if (comment.userId !== req.auth.userId){
                            return res.status(401).json({ error: new Error('Requête non autorisée !')});
                        }
                Comment.deleteOne( { _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Commentaire Supprimé'}))
                    .catch(error => res.status(400).json({ error })); 
            });
        };
   // })
   //     .catch(error => res.status(500).json({ error }));
    
// };

/* pouvoir trouver un seul objet dans la BDD par son id */
exports.getOneComment = (req,res,next) => {
    Comment.findOne({ _id: req.params.id})
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }));
};

/* récupérer tous les commentaires de la BDD */
exports.getAllComment = (req,res, next) => {
    Comment.find()
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

/* gestion des likes et dislikes */
exports.likeComment =(req, res, next) => {
    /* la requête sera envoyée par body---> raw au format JSOn avec 2 propriétés :
    { "userID":"",
       "like": 1 ou 0 ou -1} */
    Comment.findOne({_id: req.params.id})
      .then((comment) => { 
          /* like =1 (likes +1 : aime le comm) : ajouter l'userId dans le tableau des likes */
          /* méthode JavaScript includes() 
          opérateurs mongoDB $inc 
                             $push 
                             $pull  */
          if(!comment.usersLiked.includes(req.body.userId) && req.body.like === 1){
          /* userId n'est pas présent dans le usersLiked de la base de données */
          /* mise à jour de la BDD */
              Comment.updateOne(
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
          if(comment.usersLiked.includes(req.body.userId) && req.body.like === 0){
              /* userId est présent dans le usersLiked de la base de données mais on veut like =0 */
              /* mise à jour de la BDD */
                  Comment.updateOne(
                      {_id: req.params.id},
                      {
                          $inc: {likes: -1},
                          $pull: {usersLiked: req.body.userId}
                      }
                  )
                      .then(() => res.status(201).json({ message: 'Like -1!' }))
                      .catch(error => res.status(400).json({ error }));
              }

          /* like =-1 (dislikes +1 : n'aime PAS le comm) */
          if(!comment.usersDisliked.includes(req.body.userId) && req.body.like === -1){
              /* userId est présent dans le usersDisliked de la base de données ET dislikes =1 */
              /* mise à jour de la BDD */
                  Comment.updateOne(
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
          if(comment.usersDisliked.includes(req.body.userId) && req.body.like === 0){
              /* userId est présent dans le usersLiked de la base de données mais on veut like =0 */
              /* mise à jour de la BDD */
                  Comment.updateOne(
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