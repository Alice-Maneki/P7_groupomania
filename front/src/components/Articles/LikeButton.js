import React, { useState, useEffect } from "react";
import appelApi from '../../services/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ article }) => {

  const [liked, setliked] = useState(false);
  
  const userId = JSON.parse(localStorage.getItem("userId"));
  
  useEffect(() => {
    if(article.usersLiked.includes(userId)) setliked(true)
  }, [userId, article.usersLiked, liked]);

  const like = () => {
    
    appelApi.likeArticle(article._id, userId)
        .then((res) => {
          console.log(res);
            setliked(true);           
        })
        .catch((error) => console.log(error.message));
  };

  const unlike = () => {
    
    appelApi.unlikeArticle(article._id, userId)
        .then((res) => {
          console.log(res);
            setliked(false);
            
        })
        .catch((error) => console.log(error.message));
  };

 


  return (
    
    <div className="article-foot-like" >
      {liked === false &&(
        <>
          <FontAwesomeIcon
            className="article-foot-like-icon"
            icon={faHeart}
            onClick={like}
          ></FontAwesomeIcon>         
        </>
      ) }
      { liked &&(
      
        <>
        <FontAwesomeIcon
            className="article-foot-like-icon-red"
            icon={faHeart}
            onClick={unlike}
          ></FontAwesomeIcon>
          
        </>
      )}
      <span>{article.usersLiked.length}</span>
    </div>
  ) 
  };
      


export default LikeButton;
