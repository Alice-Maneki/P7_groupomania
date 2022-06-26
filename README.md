# React / Express / MongoDB

# frontend
créé en utilisant React 

pour lancer l'application front :
`cd front` + `$ npm start`

config : 
-créer un ficher .env contenant :
REACT_APP_API_URL = (url du serveur)

# backend
config : 
-informations de cluster dans le fichier `DB/db.js`
-créer un fichier .env contenant :
DB_USERNAME = (username MongoDB)
DB_PASSWORD = (password MongoDB)
DB_NAME = (name of DDB)
CRYPTOJS_EMAIL = (secret key)
JWT_KEY_TOKEN = (secret key)

pour lancer le serveur :
`cd back` + `$ npm start`

# Routes
## créer un compte POST
http://localhost:5000/api/auth/signup

## se connecter avec un compte existant POST
http://localhost:5000/api/auth/login

## récupérer les comptes utilisateurs GET
http://localhost:5000/api/auth/user

## récuper un compte utilisateur GET
http://localhost:5000/api/auth/user/:id

## créer un article POST
http://localhost:5000/api/article/

## afficher tous les articles sur l'appli GET
http://localhost:5000/api/article/

## modifier un article PUT
http://localhost:5000/api/article/:id

## supprimer un article DELETE
http://localhost:5000/api/article/:id

## gestion des likes
http://localhost:5000/api/article/:id/like

## ajouter un commentaire 
http://localhost:5000/api/article/comment/:id

## modifier un commentaire
http://localhost:5000/api/article/comment/:id

## supprimer un commentaire
http://localhost:5000/api/article/comment/:id


