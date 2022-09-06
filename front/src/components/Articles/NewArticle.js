/* formulaire pour créer un nouvel article et le poster sur le fil d'actualité */
import React, { useState, useEffect } from 'react';
import { toastArticlePosted } from '../../services/toasts.article';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import appelApi from '../../services/api';
import { isEmpty } from '../../services/utils';



const NewArticle = () => {
  // on utilise useState pour stocker les données
   const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);
  

   const userId = JSON.parse(localStorage.getItem("userId"));

   // on récupére les données utilisateur pour les implémenter

   const userData = () => {
    appelApi.getUserById(userId)
      .then((res) => {
        setUser(res.data);
        
      })
      .catch((error) => {console.log(error)});
   };

   useEffect(() => {
    userData(userId);
  }, []);
  
   // on envoie les données à la BDD pour créer un nouvel article
   const sendData = (event) => {
    event.preventDefault();
    
    const article = { userId, message };
    const messageError = document.querySelector(".messageError");
    
    if(message === ''){
      messageError.innerHTML = "Votre article est vide !!";
      
    } else {
      appelApi.newArticle(article)
        .then((res) => {
          if(res.ok && message === !isEmpty){
            console.log(res);      
            toastArticlePosted();
            alert('nouveau message publié');
            
          }       
        })
        .catch((error) => {console.log(error)});
      console.log("postArticle", article);
      } 
  };
  
   

    return (
        <>
            <div className="new-article-container">
              <div className='new-article-userId'>
                <img className="new-article-userId-pict" src={user.picture} alt="profil utilisateur" />
                <p className='new-article-userId-name'>{user.name} {user.firstName}</p>
              </div>

                <form  className="new-article-form">
                    
                    <textarea
                        id="message"
                        name="message"
                        type="text"
                        placeholder="créer un nouveau message"
                        value={message}
                        required
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    
                    <FontAwesomeIcon
                    className='new-article-photo-icon'
                    icon={faPhotoFilm}
                    ></FontAwesomeIcon>
                </form>
                <div className="messageError"></div>
                <button 
                onClick={(event) => sendData(event)} 
                className="btn-publier"
                >Publier</button>
            </div>
        </>
       
    );
};

export default NewArticle;