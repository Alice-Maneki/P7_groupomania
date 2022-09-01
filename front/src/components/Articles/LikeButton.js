import React, { useState, useEffect } from "react";
import appelApi from '../../services/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ article }) => {

  const [liked, setliked] = useState(true);
  
  const userId = JSON.parse(localStorage.getItem("userId"));
  
  const like = () => {
    return appelApi.likeArticle(article._id, userId)
        .then((res) => {
          console.log(res);
            setliked(true);           
        })
        .catch((error) => console.log(error.message));
  };

  const unlike = () => {
    return appelApi.likeArticle(article._id, userId)
        .then((res) => {
          console.log(res);
            setliked(false);
            
        })
        .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if(article.likes.includes(userId)) setliked(true)
  }, []);


  return (
    
    <div className="article-foot-like" >
      {liked ? (
        <>
          <FontAwesomeIcon
            className="article-foot-like-icon"
            icon={faHeart}
            onClick={() => like(setliked)}
          ></FontAwesomeIcon>         
        </>
      ) : (
      
        <>
        <FontAwesomeIcon
            className="article-foot-like-icon-red"
            icon={faHeart}
            onClick={() => unlike(!setliked)}
          ></FontAwesomeIcon>
          
        </>
      )}
      <span>{article.usersLiked.length}</span>
    </div>
  ) 
  };
      


export default LikeButton;
