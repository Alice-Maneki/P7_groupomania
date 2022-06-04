# backend
remplir les informations des variables d'environnement dans le fichier .env (base de données MongoDB Atlas)

pour lancer le serveur :
`$ npm run start`

# Routes
## créer un compte POST
http://localhost:3000/api/auth/singup

## se connecter avec un compte existant POST
http://localhost:3000/api/auth/login

## créer un article POST
http://localhost:3000/api/article/

## afficher tous les articles sur l'appli GET
http://localhost:3000/api/article/

## affihcer un article sur l'appli GET
http://localhost:3000/api/article/:id

## modifier un article PUT
http://localhost:3000/api/article/:id

## supprimer un article DELETE
http://localhost:3000/api/article/:id

## gestion des likes/dislikes
http://localhost:3000/api/article/:id/like

