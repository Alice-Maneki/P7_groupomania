/* formulaire pour créer un nouvel article et le poster sur le fil d'actualité */
import React, { useState } from 'react';
import { toastArticlePosted } from '../../services/toasts.article';

const NewArticle = () => {
   const [messageValue, setMessageValue] = useState('');

   const sendData = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      withCredentials: true,
      body: JSON.stringify({
        message : messageValue
      }),
    };

    fetch(`${process.env.REACT_APP_API_URL}api/article/`, requestOptions)
      .then((res) => {
        if (res.status === 201) {
            toastArticlePosted();
            setMessageValue();
            console.log("setMessageValue", setMessageValue);
          }
          
        })  
      
      .catch((error) => console.log(error));
  };
   

    return (
        <>
            <div className="new-article-container">
                <form  onSubmit={sendData} className="new-article-form">
                    <label htmlFor="text"></label>
                    <input
                        id="message"
                        name="message"
                        type="text"
                        placeholder="message"
                        value={messageValue}
                        required
                        onChange={(event) => setMessageValue(event.target.value)}
                    />
                </form>
                <button type="submit">Publier</button>
            </div>
        </>
       
    );
};

export default NewArticle;